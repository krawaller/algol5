export * from "./terrain";
export * from "./grid";
export * from "./offset";

import { TerrainDef } from "./terrain";
import { AlgolGrid } from "./grid";
import { AlgolOffset } from "./offset";
import { AlgolGameBlobAnon } from "../../blob";
import { AlgolEntity } from "../../primitives";

export type AlgolBoard<Blob extends AlgolGameBlobAnon> = {
  height: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  width: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offsets?: AlgolOffset[];
  offset?: AlgolOffset;
  terrain?: { [terrain in Blob["terrain"]]: TerrainDef<Blob> };
  grids?: { [name in Blob["grid"]]: AlgolGrid<number, number> }; // TODO - grid number safety?
  holes?: AlgolEntity<Blob>[];
};

export type AlgolBoardAnon = AlgolBoard<AlgolGameBlobAnon>;

export type AlgolBoardBook<Blob extends AlgolGameBlobAnon> = Record<
  Blob["board"],
  AlgolBoard<Blob>
>;

export type AlgolBoardBookAnon = AlgolBoardBook<AlgolGameBlobAnon>;
