export * from "./terrain";

import { TerrainDef } from "./terrain";

export type Board<Position extends string, Terrain extends string> = {
  height: Number;
  width: Number;
  terrain: { [terrain in Terrain]: TerrainDef<Position> };
};
