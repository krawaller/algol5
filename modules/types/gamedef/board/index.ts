export * from "./terrain";

import { TerrainDef } from "./terrain";

export type Board<
  BoardHeight extends number,
  BoardWidth extends number,
  Position extends string,
  Terrain extends string
> = {
  height: BoardHeight;
  width: BoardWidth;
  terrain: { [terrain in Terrain]: TerrainDef<Position> };
};
