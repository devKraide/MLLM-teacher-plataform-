import type Phaser from 'phaser';
import { CampusScene, element } from './scene.ts';
import { collides } from './core/navigation.ts';
import { footRadius, studentFrame, vectors, Walker } from './core/steps.ts';
import type { Direction } from './core/steps.ts';
import type { MapObject } from './map.ts';

export class ModularScene extends CampusScene {
  private walker!: Walker;
  private door!: MapObject;
  private doorArt!: Phaser.GameObjects.Graphics;
  private open = false;
  private traveled = 0;
  private pendingMode?: 'free' | 'grid';

  constructor() { super('Reception'); }

  preload(): void {
    this.load.image('modular-tiles', './assets/modular-tiles.png');
    this.load.tilemapTiledJSON('reception', './maps/reception.tmj');
    // B-01 student: 5 columns (idle, walk 0-3) × 4 rows in `directions` order.
    this.load.spritesheet('student-main', './assets/characters/student-main/student-main.png', { frameWidth: 32, frameHeight: 40 });
  }

  protected buildWorld(): boolean {
    if (!this.cache.tilemap.exists('reception') || !this.textures.exists('modular-tiles') || !this.textures.exists('student-main')) {
      element('notice').textContent = 'Não foi possível carregar o trecho modular.';
      return false;
    }
    const map = this.make.tilemap({ key: 'reception' });
    const tiles = map.addTilesetImage('campus-tiles', 'modular-tiles');
    if (!tiles) return false;
    map.createLayer('ground', tiles)?.setDepth(-1);
    this.textures.get('modular-tiles').setFilter(window.Phaser.Textures.FilterMode.LINEAR);
    const objects = map.getObjectLayer('objects')!.objects as unknown as MapObject[];
    const spawn = objects.find(object => object.type === 'spawn')!;
    this.door = objects.find(object => object.type === 'door')!;
    this.position = { x: spawn.x, y: spawn.y };
    this.walker = new Walker(this.position);
    this.bounds = { x: 0, y: 0, width: map.widthInPixels, height: map.heightInPixels };
    const physicalObjects = objects.filter(object => object.type !== 'spawn');
    this.walls = physicalObjects;
    this.regions = [
      { id: 301, name: 'reception', type: 'region', x: 120, y: 56, width: 240, height: 108, properties: [
        { name: 'label', type: 'string', value: 'Recepção' }, { name: 'caption', type: 'string', value: 'Entrada principal' },
      ] },
      { id: 302, name: 'garden', type: 'region', x: 0, y: 0, width: this.bounds.width, height: this.bounds.height, properties: [
        { name: 'label', type: 'string', value: 'Jardim central' }, { name: 'caption', type: 'string', value: 'Caminho até a recepção' },
      ] },
    ];
    for (const obj of physicalObjects) this.drawObject(obj);
    this.drawDoor();
    const { x, y } = this.position;
    this.shadow = this.add.ellipse(x, y, 14, 5, 0x123c35, .35);
    this.textures.get('student-main').setFilter(window.Phaser.Textures.FilterMode.NEAREST);
    // Feet contact pixel (16, 38) of the 32×40 frame sits on the world position.
    this.player = this.add.image(x, y, 'student-main', studentFrame(this.walker.facing, 0)).setOrigin(.5, 38 / 40);
    this.updateDepth();
    const mode = element<HTMLButtonElement>('movement-mode');
    mode.hidden = false;
    mode.addEventListener('click', () => {
      this.pendingMode = (this.pendingMode ?? this.walker.mode) === 'grid' ? 'free' : 'grid';
      if (!this.walker.target) this.applyMode();
    }, { signal: this.listeners.signal });
    document.querySelector<HTMLElement>('[data-region="classroom"]')!.hidden = true;
    return true;
  }

  private drawObject(object: MapObject): void {
    const { x, y, width: w, height: h, type } = object;
    const g = this.add.graphics().setDepth(y + h);
    if (type === 'door') { this.doorArt = g; return; }
    if (type === 'tree') {
      const cx = x + w / 2;
      const cy = y + h - 30;
      this.add.ellipse(cx + 10, y + 2, 45, 22, 0x173b2c, .28).setDepth(0);
      g.fillStyle(0x6b4c34).fillRect(cx - 5, y - 19, 10, 34);
      g.fillStyle(0x967353).fillRect(cx - 4, y - 13, 3, 26);
      for (const [dx, dy, size] of [[0, 0, 22], [-17, 4, 16], [17, 3, 17], [-9, -14, 17], [11, -12, 18], [0, 10, 18]]) {
        g.fillStyle(0x215844).fillCircle(cx + dx, cy + dy, size);
        g.fillStyle(0x32735a).fillCircle(cx + dx - 2, cy + dy - 3, size - 3);
        g.fillStyle(0x4a8966).fillCircle(cx + dx - 5, cy + dy - 5, size * .48);
        for (let i = 0; i < 7; i++) {
          g.fillStyle(i % 2 ? 0x68a078 : 0x28684f).fillRect(cx + dx - 10 + (i * 7) % 18, cy + dy - 9 + (i * 3) % 14, 3, 2);
        }
      }
      return;
    }
    if (type === 'plant') {
      g.fillStyle(0xa77852).fillRect(x+3,y+4,w-6,h-4);
      g.fillStyle(0x2e6e51).fillCircle(x+w/2,y+2,9);
      g.fillStyle(0x63a478).fillCircle(x+w/2-3,y-2,5);
      return;
    }
    const isWall = type === 'wall';
    g.fillStyle(0x233d36,.28).fillRect(x+3,y+3,w,h);
    g.fillStyle(isWall ? 0x708583 : type === 'desk' ? 0x977c5f : 0x426762).fillRect(x,y,w,h);
    g.fillStyle(isWall ? 0xe8e0c9 : type === 'desk' ? 0xdcc8a4 : 0xa6c0a1).fillRect(x+1,y,w-2,h-5);
    g.fillStyle(isWall ? 0xb5c5b4 : 0xf6e1c2).fillRect(x+2,y+1,w-4,2);
    if (type === 'desk') {
      g.fillStyle(0x335d57).fillRect(x+12,y+4,19,8);
      g.fillStyle(0x79c9bd).fillRect(x+14,y+5,15,2);
      g.fillStyle(0xf6eee0).fillRect(x+43,y+6,11,6);
    }
  }

  private drawDoor(): void {
    const { x, y, width, height } = this.door;
    const g = this.doorArt.clear();
    g.fillStyle(0x84ac9e).fillRect(x,y,3,height).fillRect(x+width-3,y,3,height);
    if (!this.open) {
      g.fillStyle(0x426a68).fillRect(x+3,y,width-6,height);
      g.fillStyle(0x79aea4).fillRect(x+4,y+1,width-8,height-6);
      g.fillStyle(0xd2eee0).fillRect(x+7,y+3,width-14,2);
      g.fillStyle(0xf2d496).fillRect(x+width/2-2,y+8,4,2);
    }
  }

  protected nearbyMarker(): MapObject | undefined {
    const { x, y } = this.position;
    const v = vectors[this.walker.facing];
    const door = this.door;
    // Approach from either side and face the doorway. Side walls cannot trigger it.
    const verticalDistance = v.y < 0 ? y - (door.y + door.height) : door.y - y;
    if (!this.walker.target && v.y && x >= door.x + 4 && x <= door.x + door.width - 4 &&
        verticalDistance >= footRadius && verticalDistance <= 18) return this.door;
  }

  protected interact(): void {
    if (!this.nearbyMarker()) return;
    this.open = !this.open;
    this.drawDoor();
    this.walls = this.open ? this.walls.filter(rect => rect !== this.door) : [...this.walls, this.door];
    this.updateDoorLabel();
  }

  private updateDoorLabel(): void {
    this.door.properties = [{ name: 'title', type: 'string', value: this.open ? 'Fechar porta' : 'Abrir porta' }];
    if (this.currentMarker === this.door) element('interact').querySelector('span')!.textContent = this.door.properties[0].value;
  }

  private applyMode(): void {
    if (!this.pendingMode) return;
    if (this.pendingMode === 'grid') {
      const { x, y } = this.walker.position;
      const cell = { x: Math.floor(x / 16) * 16 + 8, y: Math.floor(y / 16) * 16 + 8 };
      if (collides(cell, footRadius, this.walls)) {
        this.pendingMode = undefined;
        const notice = element('notice');
        notice.textContent = 'Afaste-se do obstáculo para mudar para o movimento em grade.';
        notice.hidden = false;
        return;
      }
      this.walker.position = cell;
    }
    this.walker.mode = this.pendingMode;
    this.pendingMode = undefined;
    element('notice').hidden = true;
    element('movement-mode').textContent = this.walker.mode === 'grid' ? 'Movimento: grade' : 'Movimento: livre';
  }

  private updateDepth(): void {
    this.player.setDepth(this.position.y + .1);
    this.shadow.setDepth(this.position.y);
  }

  protected advance(x: number, y: number, delta: number): void {
    const direction: Direction | undefined = x < 0 ? 'west' : x > 0 ? 'east' : y < 0 ? 'north' : y > 0 ? 'south' : undefined;
    const distance = this.walker.advance(this.pendingMode ? undefined : direction, delta, this.walls, this.bounds);
    if (this.pendingMode && !this.walker.target) this.applyMode();
    this.position = this.walker.position;
    this.traveled = distance > 0 ? (this.traveled + distance) % 28 : 0;
    this.player.setFrame(studentFrame(this.walker.facing, distance > 0 ? this.traveled : undefined));
    this.updateDepth();
    if (!this.door.properties) this.updateDoorLabel();
  }
}
