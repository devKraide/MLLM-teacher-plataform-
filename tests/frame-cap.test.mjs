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
      if (cap.take(timestamp, now) !== undefined) draws.push(timestamp);
    }
    assert.ok(draws.length >= 590, `${hz} Hz fell below 59 FPS`);
    // Measured on the vsync clock with the same 0.75 ms tolerance the cap uses.
    for (let i = 60; i < draws.length; i++) {
      assert.ok(draws[i] >= draws[i - 60] + 1000 - 0.75, `${hz} Hz exceeded the cap`);
    }
  }
});

test('a tab interruption produces one bounded step with no catch-up burst', () => {
  const cap = new FrameCap();
  cap.take(0, 0);
  assert.equal(cap.take(3000, 3000), 40);
  assert.equal(cap.take(3001, 3001), undefined);
});

test('120 Hz display keeps an even 2-vsync cadence under callback jitter (PERF-01)', () => {
  const cap = new FrameCap();
  const draws = [];
  for (let i = 0; i < 120 * 30; i++) {
    const timestamp = 1000 * i / 120;
    const now = timestamp + ((i * 7919) % 20) / 10; // 0-2 ms of callback delay
    if (cap.take(timestamp, now) !== undefined) draws.push(timestamp);
  }
  const gaps = draws.slice(1).map((t, i) => t - draws[i]);
  const slow = gaps.filter(gap => gap > 20).length;
  assert.equal(slow, 0, `${slow} gaps above 20 ms`);
});
