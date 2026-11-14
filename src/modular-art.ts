import type Phaser from 'phaser';
import { directions } from './core/steps.ts';

export function makeWalkerArt(textures: Phaser.Textures.TextureManager): string {
  const key = 'modular-walker';
  if (textures.exists(key)) return key;
  const texture = textures.createCanvas(key, 72, 128)!;
  const ctx = texture.getContext();
  for (const [row, direction] of directions.entries()) {
    for (let frame = 0; frame < 3; frame++) {
      const x = frame * 24;
      const y = row * 32;
      const fill = (color: string, px: number, py: number, w: number, h: number) => {
        ctx.fillStyle = color;
        ctx.fillRect(x + px, y + py, w, h);
      };
      const left = frame === 1 ? -2 : 0;
      const right = frame === 2 ? -2 : 0;
      fill('#233938', 7, 21, 10, 4);
      fill('#2b3a42', 7, 24 + left, 4, 6);
      fill('#2b3a42', 13, 24 + right, 4, 6);
      fill('#ece5ce', 6, 29 + left, 5, 2);
      fill('#ece5ce', 13, 29 + right, 5, 2);
      fill('#245954', 5, 13, 14, 10);
      fill('#4d9485', 7, 14, 10, 8);
      const side = direction === 'east' ? 2 : direction === 'west' ? -2 : 0;
      fill('#423632', 6 + side, 2, 12, 10);
      fill('#624632', 8 + side, 2, 8, 3);
      if (direction === 'north') {
        fill('#3a2c2b', 7, 7, 10, 6);
        fill('#b98b5c', 8, 15, 8, 7);
        fill('#e2bc80', 9, 16, 6, 2);
      } else {
        fill('#d6a170', 8 + side, 6, 8, 7);
        const eyes = direction === 'east' ? [16] : direction === 'west' ? [7] : [9, 14];
        for (const eye of eyes) fill('#2e3536', eye, 9, 1, 2);
        fill('#dec18e', 10, 15, 4, 2);
      }
      texture.add(`${direction}-${frame}`, 0, x, y, 24, 32);
    }
  }
  texture.refresh();
  texture.setFilter(window.Phaser.Textures.FilterMode.NEAREST);
  return key;
}
