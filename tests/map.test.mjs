import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { collides } from '../src/core/navigation.ts';
const map = JSON.parse(readFileSync(new URL('../public/maps/campus.tmj', import.meta.url), 'utf8'));
const walls = map.layers.find(item => item.name === 'collisions').objects;
const points = map.layers.find(item => item.name === 'points').objects;
const spawn = points.find(item => item.type === 'spawn');

test('Tiled object IDs are unique and referenced image assets exist', () => {
  const ids = map.layers.flatMap(layer => (layer.objects ?? []).map(item => item.id));
  assert.equal(new Set(ids).size, ids.length);
  const image = map.layers.find(layer => layer.type === 'imagelayer').image;
  assert.ok(existsSync(new URL(`../public/maps/${image}`, import.meta.url)));
});

test('spawn is outside obstacles and world dimensions match the actual PNG', () => {
  assert.equal(collides(spawn, 8, walls), false);
  const png = readFileSync(new URL('../public/assets/campus-v1.png', import.meta.url));
  assert.equal(png.readUInt32BE(16), map.width * map.tilewidth);
  assert.equal(png.readUInt32BE(20), map.height * map.tileheight);
});

test('garden, reception and classroom interaction areas connect through collision-free paths', () => {
  // Bounded 192 x 128 grid; validates topology only, not rendered alignment.
  const step = 8;
  const width = map.width * map.tilewidth / step;
  const height = map.height * map.tileheight / step;
  const queue = [{ x: Math.round(spawn.x / step), y: Math.round(spawn.y / step) }];
  const visited = new Set([queue[0].y * width + queue[0].x]);
  const goals = points.filter(point => point.type === 'interaction');
  const reached = new Set();
  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    const world = { x: current.x * step, y: current.y * step };
    for (const goal of goals) if (Math.hypot(world.x - goal.x, world.y - goal.y) < 30) reached.add(goal.name);
    for (const [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1]]) {
      const x = current.x + dx, y = current.y + dy;
      if (x < 1 || y < 1 || x >= width || y >= height) continue;
      const id = y * width + x;
      if (visited.has(id) || collides({ x: x * step, y: y * step }, 8, walls)) continue;
      visited.add(id); queue.push({ x, y });
    }
  }
  for (const goal of goals) assert.ok(reached.has(goal.name), `${goal.name} is unreachable`);
});
