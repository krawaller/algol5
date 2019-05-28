import { coords2pos } from "../";

export function boardPositions(height: number, width: number) {
  let ret = [];
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      ret.push(coords2pos({ x: x, y: y }));
    }
  }
  return ret.sort();
}
