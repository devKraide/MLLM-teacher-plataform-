import { collides, move } from './navigation.ts';
import type { Point, Rect } from './navigation.ts';

export const directions = ['south', 'west', 'east', 'north'] as const;
export type Direction = typeof directions[number];
export const vectors: Record<Direction, Point> = {
  south: { x: 0, y: 1 }, west: { x: -1, y: 0 }, east: { x: 1, y: 0 }, north: { x: 0, y: -1 },
};
export const cellSize = 16;
export const speed = 88;
export const footRadius = 4;
export const walkPixelsPerFrame = 7;
const studentColumns = 5;

// Spritesheet index for the B-01 student (docs/characters/B-01-FICHA-ESTUDANTE.md §4–5).
// `traveled` is the distance walked in the current cycle; undefined means standing still.
export function studentFrame(facing: Direction, traveled?: number): number {
  const column = traveled === undefined ? 0 : 1 + Math.floor(traveled / walkPixelsPerFrame) % 4;
  return directions.indexOf(facing) * studentColumns + column;
}

export class Walker {
  facing: Direction = 'north';
  target?: Point;
  position: Point;
  mode: 'grid' | 'free';

  constructor(position: Point, mode: 'grid' | 'free' = 'grid') {
    this.position = position;
    this.mode = mode;
  }

  advance(direction: Direction | undefined, delta: number, walls: readonly Rect[], bounds: Rect): number {
    const start = this.position;
    if (!this.target && direction) {
      this.facing = direction;
      const vector = vectors[direction];
      if (this.mode === 'free') {
        this.position = move(start, vector, delta, walls, bounds, speed, footRadius);
      } else {
        const next = { x: start.x + vector.x * cellSize, y: start.y + vector.y * cellSize };
        const middle = { x: (next.x + start.x) / 2, y: (next.y + start.y) / 2 };
        if (next.x >= footRadius && next.x <= bounds.width - footRadius &&
            next.y >= footRadius && next.y <= bounds.height - footRadius &&
            !collides(next, footRadius, walls) && !collides(middle, footRadius, walls)) this.target = next;
      }
    }
    if (this.target) {
      const remaining = Math.hypot(this.target.x - start.x, this.target.y - start.y);
      const stride = speed * Math.min(delta, 40) / 1000;
      if (remaining <= stride) {
        this.position = this.target;
        this.target = undefined;
        if (direction && stride > remaining) {
          this.advance(direction, (stride - remaining) * 1000 / speed, walls, bounds);
        }
      } else {
        const ratio = stride / remaining;
        this.position = { x: start.x + (this.target.x - start.x) * ratio, y: start.y + (this.target.y - start.y) * ratio };
      }
    }
    return Math.hypot(this.position.x - start.x, this.position.y - start.y);
  }
}
