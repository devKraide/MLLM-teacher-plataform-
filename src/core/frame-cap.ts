const interval = 1000 / 60;
const tolerance = 0.75;

// Sample on rAF, keep the fractional remainder, and drop missed slots.
// A rolling window also prevents timing tolerance from allowing a 61st draw.
export class FrameCap {
  private deadline?: number;
  private lastFrame?: number;
  private readonly recent: number[] = [];

  take(timestamp: number, now: number): number | undefined {
    if (this.deadline !== undefined && timestamp + tolerance < this.deadline) return;
    while (this.recent.length && now >= this.recent[0] + 1000) this.recent.shift();
    if (this.recent.length >= 60) return;

    const due = this.deadline ?? timestamp;
    this.deadline = due + interval * Math.max(1, Math.floor((timestamp - due + tolerance) / interval) + 1);
    const elapsed = this.lastFrame === undefined ? interval : timestamp - this.lastFrame;
    this.lastFrame = timestamp;
    this.recent.push(now);
    return Math.min(elapsed, 40);
  }
}
