import type { Rect, Point } from './core/navigation.ts';
export interface MapObject extends Rect {
  id: number; name: string; type: string;
  properties?: { name: string; type: string; value: string }[];
}
export interface CampusMap {
  width: number; height: number; tilewidth: number; tileheight: number;
  layers: { name: string; type: string; image?: string; objects?: MapObject[] }[];
}
export const objects = (map: CampusMap, layer: string): MapObject[] =>
  map.layers.find(item => item.name === layer)?.objects ?? [];
export const property = (object: MapObject, key: string): string =>
  object.properties?.find(item => item.name === key)?.value ?? '';
export const pointOf = (object: MapObject): Point => ({ x: object.x, y: object.y });
