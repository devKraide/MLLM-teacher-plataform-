import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { directions, studentFrame } from '../src/core/steps.ts';

const meta = JSON.parse(readFileSync(new URL('../public/assets/characters/student-main/student-main.json', import.meta.url)));

test('sheet metadata matches the movement code', () => {
  assert.deepEqual(meta.directions, [...directions]);
  assert.equal(meta.columns.length, 5);
  assert.equal(meta.walk.pixelsPerFrame, 7);
});

test('idle uses column 0 of each direction row', () => {
  directions.forEach((direction, row) => assert.equal(studentFrame(direction), row * 5));
});

test('walking cycles through the four walk columns every 28 px', () => {
  const frames = [0, 6.9, 7, 14, 21, 27.9].map(distance => studentFrame('east', distance));
  assert.deepEqual(frames, [11, 11, 12, 13, 14, 14]);
});
