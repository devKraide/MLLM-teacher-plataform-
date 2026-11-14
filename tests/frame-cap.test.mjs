import assert from 'node:assert/strict';
import { test } from 'node:test';
import { FrameCap } from '../src/core/frame-cap.ts';

test('accepts at most 60 draws in a rolling second across display rates', () => {
  for (const hz of [60, 75, 120, 144, 165, 240]) {
    const cap = new FrameCap();
    const draws = [];
    for (let i = 0; i < hz * 10; i++) {
      const timestamp = 1000 * i / hz;
      const now = timestamp + (i % 5) * 0.08;
      if (cap.take(timestamp, now) !== undefined) draws.push(now);
    }
    assert.ok(draws.length >= 590, `${hz} Hz fell below 59 FPS`);
    for (let i = 60; i < draws.length; i++) {
      assert.ok(draws[i] >= draws[i - 60] + 1000, `${hz} Hz exceeded the cap`);
    }
  }
});

test('a tab interruption produces one bounded step with no catch-up burst', () => {
  const cap = new FrameCap();
  cap.take(0, 0);
  assert.equal(cap.take(3000, 3000), 40);
  assert.equal(cap.take(3001, 3001), undefined);
});
