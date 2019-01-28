export * from "./terrain";
export * from "./grid";

import { TerrainDef } from "./terrain";
import { AlgolGrid } from "./grid";

export type Board<
  BoardHeight extends number,
  BoardWidth extends number,
  Grid extends string,
  Position extends string,
  Terrain extends string
> = {
  height: BoardHeight;
  width: BoardWidth;
  terrain?: { [terrain in Terrain]: TerrainDef<Position> };
  grids?: { [name in Grid]: AlgolGrid<BoardHeight, BoardWidth> };
};

export type BoardAnon = Board<number, number, string, string, string>;
