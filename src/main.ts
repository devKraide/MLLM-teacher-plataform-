import type Phaser from 'phaser';
import { CampusScene } from './scene.ts';
import { ModularScene } from './modular-scene.ts';
import { FrameCap } from './core/frame-cap.ts';

declare global { interface Window { Phaser: typeof Phaser } }
const notice = document.querySelector<HTMLElement>('#notice')!;
const host = document.querySelector<HTMLElement>('#world')!;
const original = new URLSearchParams(location.search).has('original');
const compare = document.querySelector<HTMLAnchorElement>('#compare-scene')!;
compare.href = original ? './' : './?original=1';
compare.textContent = original ? 'Trecho modular' : 'Cenário original';

try {
  if (!window.Phaser) throw new Error('O motor local ainda não foi preparado. Execute o build após autorizar a instalação.');
  const engine = window.Phaser;
  const game = new engine.Game({
    type: engine.WEBGL,
    parent: host,
    backgroundColor: '#173f38',
    width: host.clientWidth,
    height: host.clientHeight,
    // The current artwork is usually displayed at a fractional scale. Linear
    // texture sampling keeps its details from flickering as the camera moves.
    pixelArt: false,
    antialias: true,
    audio: { noAudio: true },
    fps: { target: 60, smoothStep: false },
    scale: { mode: engine.Scale.RESIZE },
    scene: [original ? CampusScene : ModularScene],
    render: { powerPreference: 'low-power', antialiasGL: false, roundPixels: false },
    callbacks: { postBoot: (bootedGame) => {
      const cap = new FrameCap();
      const step = bootedGame.step.bind(bootedGame);
      // Phaser binds Game.step to its clock after postBoot. Gate the whole
      // update/render pass, including any tick that follows a pause.
      bootedGame.step = (timestamp) => {
        const elapsed = cap.take(timestamp, performance.now());
        if (elapsed !== undefined) step(timestamp, elapsed);
      };
      host.querySelector('canvas')?.setAttribute('aria-label', 'Campus explorável, controle com WASD e setas');
    } },
  });
  window.addEventListener('pagehide', () => game.destroy(true), { once: true });
} catch (error) {
  notice.hidden = false;
  notice.textContent = error instanceof Error ? error.message : 'Não foi possível iniciar o cenário com WebGL.';
}
