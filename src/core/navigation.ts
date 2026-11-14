export interface Point { x: number; y: number }
export interface Rect extends Point { width: number; height: number }

export function contains(point: Point, area: Rect): boolean {
  return point.x >= area.x && point.x <= area.x + area.width &&
    point.y >= area.y && point.y <= area.y + area.height;
}

export function collides(point: Point, radius: number, walls: readonly Rect[]): boolean {
  return walls.some(wall => {
    const x = Math.max(wall.x, Math.min(point.x, wall.x + wall.width));
    const y = Math.max(wall.y, Math.min(point.y, wall.y + wall.height));
    return (point.x - x) ** 2 + (point.y - y) ** 2 < radius ** 2;
  });
}

// Substeps prevent crossing thin walls. A long hidden-tab frame never teleports.
export function move(
  origin: Point, input: Point, elapsedMs: number, walls: readonly Rect[],
  bounds: Rect, speed = 145, radius = 8,
): Point {
  if (![origin.x, origin.y, input.x, input.y, elapsedMs, speed, radius].every(Number.isFinite)) {
    return { ...origin };
  }
  const length = Math.hypot(input.x, input.y);
  if (!length || elapsedMs <= 0) return { ...origin };
  const distance = speed * Math.min(elapsedMs, 40) / 1000;
  const steps = Math.max(1, Math.ceil(distance / Math.max(1, radius / 2)));
  const dx = input.x / length * distance / steps;
  const dy = input.y / length * distance / steps;
  const next = { ...origin };
  for (let i = 0; i < steps; i++) {
    const x = Math.max(bounds.x + radius, Math.min(next.x + dx, bounds.x + bounds.width - radius));
    if (!collides({ x, y: next.y }, radius, walls)) next.x = x;
    const y = Math.max(bounds.y + radius, Math.min(next.y + dy, bounds.y + bounds.height - radius));
    if (!collides({ x: next.x, y }, radius, walls)) next.y = y;
  }
  return next;
}

export function nearest<T extends Point>(point: Point, objects: readonly T[], range: number): T | undefined {
  let selected: T | undefined;
  let best = range;
  for (const item of objects) {
    const distance = Math.hypot(item.x - point.x, item.y - point.y);
    if (distance < best) { best = distance; selected = item; }
  }
  return selected;
}
