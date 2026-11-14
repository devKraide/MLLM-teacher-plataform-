import test from 'node:test';
import assert from 'node:assert/strict';
import { move, collides, nearest } from '../src/core/navigation.ts';
const bounds = { x: 0, y: 0, width: 200, height: 200 };

test('diagonal movement has the same speed as horizontal movement', () => {
  const start = { x: 50, y: 50 };
  const straight = move(start, { x: 1, y: 0 }, 16, [], bounds);
  const diagonal = move(start, { x: 1, y: 1 }, 16, [], bounds);
  assert.ok(Math.abs(Math.hypot(diagonal.x - 50, diagonal.y - 50) - (straight.x - 50)) < 1e-9);
});

test('thin wall remains solid even after a hidden-tab delay', () => {
  const walls = [{ x: 60, y: 0, width: 2, height: 200 }];
  const next = move({ x: 50, y: 80 }, { x: 1, y: 0 }, 5000, walls, bounds);
  assert.ok(next.x <= 52);
  assert.equal(collides(next, 8, walls), false);
});

test('player can slide along a wall without entering it', () => {
  const next = move({ x: 52, y: 50 }, { x: 1, y: 1 }, 32,
    [{ x: 60, y: 0, width: 5, height: 200 }], bounds);
  assert.equal(next.x, 52);
  assert.ok(next.y > 50);
});

test('world bounds retain the entire player collision circle', () => {
  const next = move({ x: 8, y: 8 }, { x: -1, y: -1 }, 40, [], bounds);
  assert.deepEqual(next, { x: 8, y: 8 });
});

test('contextual interaction selects only the closest reachable-radius marker', () => {
  const objects = [{ id: 'far', x: 100, y: 100 }, { id: 'near', x: 20, y: 20 }];
  assert.equal(nearest({ x: 15, y: 15 }, objects, 30)?.id, 'near');
  assert.equal(nearest({ x: 190, y: 190 }, objects, 20), undefined);
});

test('invalid timing cannot corrupt the player position', () => {
  assert.deepEqual(move({ x: 50, y: 50 }, { x: 1, y: 0 }, NaN, [], bounds), { x: 50, y: 50 });
});
