export * from "./terrain";
export * from "./grid";
export * from "./offset";

import { TerrainDef } from "./terrain";
import { AlgolGrid } from "./grid";
import { AlgolOffset } from "./offset";

export type AlgolBoard<
  BoardHeight extends number,
  BoardWidth extends number,
  Grid extends string,
  Position extends string,
  Terrain extends string
> = {
  height: BoardHeight;
  width: BoardWidth;
  offsets?: AlgolOffset[];
  offset?: AlgolOffset;
  terrain?: { [terrain in Terrain]: TerrainDef<Position> };
  grids?: { [name in Grid]: AlgolGrid<BoardHeight, BoardWidth> };
};

export type AlgolBoardAnon = AlgolBoard<number, number, string, string, string>;

export type AlgolBoardBookAnon = {
  basic: AlgolBoardAnon;
} & Record<string, AlgolBoardAnon>;
