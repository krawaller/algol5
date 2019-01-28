import { AlgolEntity } from "../../";

export type TerrainDef<Position extends string> =
  | Partial<{
      0: AlgolEntity<Position>[];
      1: AlgolEntity<Position>[];
      2: AlgolEntity<Position>[];
    }>
  | AlgolEntity<Position>[];
