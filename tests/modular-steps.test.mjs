import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { Walker } from '../src/core/steps.ts';
const map = JSON.parse(readFileSync(new URL('../public/maps/reception.tmj', import.meta.url)));
const objects = map.layers.find(layer => layer.name === 'objects').objects;
const spawn = objects.find(object => object.type === 'spawn');
const door = objects.find(object => object.type === 'door');
const walls = objects.filter(object => object !== spawn);
const bounds = { x: 0, y: 0, width: map.width * 16, height: map.height * 16 };

for (const mode of ['grid', 'free']) {
  test(`${mode} cannot cross the closed door and enters when open`, () => {
    const walker = new Walker({ x: spawn.x, y: spawn.y }, mode);
    for (let i = 0; i < 180; i++) walker.advance('north', 1000 / 60, walls, bounds);
    assert.ok(walker.position.y >= door.y + door.height + 4);
    const openWalls = walls.filter(object => object !== door);
    for (let i = 0; i < 80; i++) walker.advance('north', 1000 / 60, openWalls, bounds);
    assert.ok(walker.position.y < door.y);
  });
}

test('grid walker finishes a started step after key release', () => {
  const walker = new Walker({ x: spawn.x, y: spawn.y });
  walker.advance('north', 1000 / 60, walls, bounds);
  for (let i = 0; i < 60; i++) walker.advance(undefined, 1000 / 60, walls, bounds);
  assert.equal(walker.target, undefined);
  assert.deepEqual(walker.position, { x: spawn.x, y: spawn.y - 16 });
});
