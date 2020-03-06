import { AlgolEntity } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type TerrainDef<Blob extends AlgolGameBlobAnon> =
  | Partial<{
      0: AlgolEntity<Blob>[];
      1: AlgolEntity<Blob>[];
      2: AlgolEntity<Blob>[];
    }>
  | AlgolEntity<Blob>[];

export type TerrainDefAnon = TerrainDef<AlgolGameBlobAnon>;
