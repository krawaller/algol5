import { AlgolGrid } from "../../types";
import { coords2pos } from "./coords2pos";

export function griddef2grid(grid: AlgolGrid<number, number>) {
  const ret: Record<string, number> = {};
  for (let y = 0; y < grid.length; y++) {
    const row = grid[grid.length - y - 1];
    for (let x = 0; x < grid.length; x++) {
      const pos = coords2pos({ x: x + 1, y: y + 1 });
      ret[pos] = row[x];
    }
  }
  return ret;
}

export function makeGrids(grids: Record<string, AlgolGrid<number, number>>) {
  const ret: Record<string, Record<string, number>> = {};
  for (const name of Object.keys(grids)) {
    ret[name] = griddef2grid(grids[name]);
  }
  return ret;
}
