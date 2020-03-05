import { AlgolVal, Generators, TerrainDef, AlgolGrid } from "../../";

import { Brain } from "./brain";
import { AlgolGameBlobAnon } from "../../blob";

type AiTerrain = string;
type AiGrid = string;
type AiArtifactLayer = string;
type BoardHeight = number;
type BoardWidth = number;

export type AI<Blob extends AlgolGameBlobAnon> = {
  terrain?: { [t in AiTerrain]: TerrainDef<Position> };
  grids?: { [s in AiGrid]: AlgolGrid<BoardHeight, BoardWidth> };
  generators?: Generators<
    AiArtifactLayer,
    Btlp,
    Btlv,
    Cmnd,
    AiGenerator,
    Grid | AiGrid,
    Layer | AiTerrainLayer | AiArtifactLayer,
    Mrk,
    Turnp,
    Turnv
  >;
  aspects: {
    [a in AiAspect]: AlgolVal<
      AiGenerator,
      Btlp,
      Btlv,
      Cmnd,
      Grid | AiGrid,
      Layer | AiTerrainLayer | AiArtifactLayer,
      Mrk,
      Turnp,
      Turnv
    >;
  };
  brains: {
    [b in AiBrain]: Brain<
      AiAspect,
      AiGenerator,
      Btlp,
      Btlv,
      Cmnd,
      Grid | AiGrid,
      Layer | AiTerrainLayer | AiArtifactLayer,
      Mrk,
      Turnp,
      Turnv
    >;
  };
};
