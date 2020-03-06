/*
The Entity type is used to define points on a board. This is used in Terrain and Setup definitions.
Entities are only ever evaluated at compile time, and don't have Logical variants.
*/

export * from "./entity.interfaces";
export * from "./entity.guard";
export * from "./entity.anon";

import {
  AlgolEntityDataHoleRect,
  AlgolEntityDataRect,
  AlgolEntityDataSites,
  AlgolEntityHoleRect,
  AlgolEntityRect,
  AlgolEntitySites,
} from "./entity.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolEntity<Blob extends AlgolGameBlobAnon> =
  | Blob["pos"]
  | AlgolEntityDataHoleRect<Blob>
  | AlgolEntityDataRect<Blob>
  | AlgolEntityDataSites<Blob>
  | AlgolEntityHoleRect<Blob>
  | AlgolEntityRect<Blob>
  | AlgolEntitySites<Blob>;
