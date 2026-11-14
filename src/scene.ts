import type Phaser from 'phaser';
import { contains, move, nearest } from './core/navigation.ts';
import type { Point, Rect } from './core/navigation.ts';
import { objects, property, pointOf } from './map.ts';
import type { CampusMap, MapObject } from './map.ts';

export const element = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;
// Resolve the global at construction time; missing engine is handled in main.ts.
const BaseScene = window.Phaser?.Scene ?? class {} as typeof Phaser.Scene;

export class CampusScene extends BaseScene {
  protected position: Point = { x: 767, y: 928 };
  protected bounds: Rect = { x: 0, y: 0, width: 1536, height: 1024 };
  protected walls: Rect[] = [];
  protected regions: MapObject[] = [];
  protected markers: MapObject[] = [];
  protected player!: Phaser.GameObjects.Image;
  protected shadow!: Phaser.GameObjects.Ellipse;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  protected currentMarker?: MapObject;
  private paused = false;
  private overview = false;
  private showStats = false;
  private sampleTime = 0;
  private samples: number[] = [];
  private lastFrameAt = 0;
  private currentRegion = '';
  protected listeners = new AbortController();

  constructor(key = 'Campus') { super({ key }); }

  preload(): void {
    element('notice').textContent = 'Preparando o campus…';
    this.load.image('campus', './assets/campus-v1.png');
    this.load.image('student', './assets/student-v1.png');
    this.load.json('campus-map', './maps/campus.tmj');
    this.load.on('loaderror', () => {
      element('notice').hidden = false;
      element('notice').textContent = 'Não foi possível carregar um arquivo do cenário. Refaça o build e recarregue.';
    });
  }

  protected buildWorld(): boolean {
    if (!this.textures.exists('campus') || !this.textures.exists('student') || !this.cache.json.exists('campus-map')) return false;
    const map = this.cache.json.get('campus-map') as CampusMap;
    this.bounds = { x: 0, y: 0, width: map.width * map.tilewidth, height: map.height * map.tileheight };
    this.walls = objects(map, 'collisions');
    this.regions = objects(map, 'regions');
    this.markers = objects(map, 'points').filter(item => item.type === 'interaction');
    const spawn = objects(map, 'points').find(item => item.type === 'spawn');
    if (spawn) this.position = pointOf(spawn);
    this.add.image(0, 0, 'campus').setOrigin(0).setDepth(0);
    this.shadow = this.add.ellipse(this.position.x, this.position.y, 24, 9, 0x123c35, .28).setDepth(1);
    this.player = this.add.image(this.position.x, this.position.y, 'student').setOrigin(.5, .99).setDepth(2);
    this.player.setScale(55 / this.player.height);
    for (const marker of this.markers) {
      this.add.circle(marker.x, marker.y, 4, 0xfdf3b6, .9).setStrokeStyle(2, 0x426d58).setDepth(1);
    }
    return true;
  }

  create(): void {
    if (!this.buildWorld()) return;
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,E,ESC') as Record<string, Phaser.Input.Keyboard.Key>;
    this.input.keyboard!.addCapture(['UP', 'DOWN', 'LEFT', 'RIGHT']);
    this.cameras.main.setBounds(0, 0, this.bounds.width, this.bounds.height);
    this.fitCamera();
    this.scale.on('resize', this.fitCamera, this);
    this.game.events.on(window.Phaser.Core.Events.POST_RENDER, this.recordFrame, this);
    this.events.once('shutdown', () => {
      this.listeners.abort();
      this.scale.off('resize', this.fitCamera, this);
      this.game.events.off(window.Phaser.Core.Events.POST_RENDER, this.recordFrame, this);
    });
    const listen = (id: string, callback: () => void) => element(id).addEventListener('click', callback, { signal: this.listeners.signal });
    listen('overview', () => { this.overview = !this.overview; this.fitCamera(); element('overview').textContent = this.overview ? 'Acompanhar você' : 'Ver campus'; });
    listen('pause', () => this.setPaused(!this.paused));
    listen('resume', () => this.setPaused(false));
    listen('stats-toggle', () => {
      this.showStats = !this.showStats;
      this.samples = [];
      this.lastFrameAt = 0;
      element('stats').hidden = !this.showStats;
      if (this.showStats) element('stats').textContent = 'Medindo quadros…';
      element('stats-toggle').setAttribute('aria-pressed', String(this.showStats));
    });
    listen('interact', () => this.interact());
    listen('close-detail', () => element<HTMLDialogElement>('detail').close());
    listen('detail-done', () => element<HTMLDialogElement>('detail').close());
    element('detail').addEventListener('close', () => { this.input.keyboard?.resetKeys(); }, { signal: this.listeners.signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.setPaused(true); }, { signal: this.listeners.signal });
    window.addEventListener('blur', () => { this.input.keyboard?.resetKeys(); }, { signal: this.listeners.signal });
    ['overview', 'pause', 'stats-toggle'].forEach(id => element<HTMLButtonElement>(id).disabled = false);
    element('notice').hidden = true;
    this.refreshLocation();
  }

  private setPaused(value: boolean): void {
    this.paused = value;
    this.input.keyboard?.resetKeys();
    element('pause-overlay').hidden = !value;
    element('pause').textContent = value ? 'Continuar' : 'Pausar';
    this.samples = [];
    this.lastFrameAt = 0;
    if (value) this.game.loop.sleep();
    else this.game.loop.wake();
  }

  private fitCamera(): void {
    const camera = this.cameras.main;
    const fit = Math.min(this.scale.width / this.bounds.width, this.scale.height / this.bounds.height);
    camera.setZoom(fit * (this.overview ? 1 : 1.3));
    if (this.overview) camera.centerOn(this.bounds.width / 2, this.bounds.height / 2);
    else camera.centerOn(this.position.x, this.position.y);
  }

  protected interact(): void {
    if (!this.currentMarker || this.paused) return;
    element('detail-title').textContent = property(this.currentMarker, 'title');
    element('detail-body').textContent = property(this.currentMarker, 'body');
    const dialog = element<HTMLDialogElement>('detail');
    if (!dialog.open) dialog.showModal();
    this.input.keyboard?.resetKeys();
  }

  private refreshLocation(): void {
    const region = this.regions.find(item => contains(this.position, item));
    if (!region || region.name === this.currentRegion) return;
    this.currentRegion = region.name;
    element('location-name').textContent = property(region, 'label');
    element('location-caption').textContent = property(region, 'caption');
    document.querySelectorAll<HTMLElement>('[data-region]').forEach(item => item.classList.toggle('active', item.dataset.region === region.name));
  }

  protected advance(x: number, y: number, delta: number): void {
    if (x || y) this.position = move(this.position, { x, y }, delta, this.walls, this.bounds);
  }

  protected nearbyMarker(): MapObject | undefined {
    return nearest(this.position, this.markers, 55);
  }

  update(time: number, delta: number): void {
    if (!this.keys || this.paused) return;
    const dialogOpen = element<HTMLDialogElement>('detail').open;
    if (window.Phaser.Input.Keyboard.JustDown(this.keys.ESC) && !dialogOpen) { this.setPaused(true); return; }
    const x = Number(this.keys.D.isDown || this.keys.RIGHT.isDown) - Number(this.keys.A.isDown || this.keys.LEFT.isDown);
    const y = Number(this.keys.S.isDown || this.keys.DOWN.isDown) - Number(this.keys.W.isDown || this.keys.UP.isDown);
    if (!dialogOpen) {
      this.advance(x, y, delta);
      const { x: worldX, y: worldY } = this.position;
      this.player.setPosition(worldX, worldY);
      this.shadow.setPosition(worldX, worldY);
      // Follow the feet in world space. Future sprite animation can change the
      // artwork without moving the camera or the collision point.
      if (!this.overview) this.cameras.main.centerOn(worldX, worldY);
    }
    const marker = this.nearbyMarker();
    if (marker !== this.currentMarker) {
      this.currentMarker = marker;
      element('interact').hidden = !marker;
      if (marker) element('interact').querySelector('span')!.textContent = property(marker, 'title');
    }
    if (!dialogOpen && window.Phaser.Input.Keyboard.JustDown(this.keys.E)) this.interact();
    this.refreshLocation();
  }

  private recordFrame(_renderer: unknown, time: number): void {
    if (!this.showStats || this.paused) return;
    const frameAt = performance.now();
    if (this.lastFrameAt > 0) {
      this.samples.push(frameAt - this.lastFrameAt);
      if (this.samples.length > 180) this.samples.shift();
    }
    this.lastFrameAt = frameAt;
    if (time - this.sampleTime > 1000 && this.samples.length > 0) {
      this.sampleTime = time;
      const sorted = [...this.samples].sort((a, b) => a - b);
      const p95 = sorted[Math.ceil(sorted.length * .95) - 1];
      const fps = 1000 * sorted.length / sorted.reduce((total, interval) => total + interval, 0);
      element('stats').textContent = `${fps.toFixed(1)} FPS · WebGL\nP95 local: ${p95.toFixed(1)} ms\n${sorted.length} intervalos entre quadros\nPosição: ${Math.round(this.position.x)}, ${Math.round(this.position.y)}`;
    }
  }
}
