import { AlgolVal, Generators, TerrainDef, AlgolGrid } from "../../";

import { Brain } from "./brain";
import { AlgolGameBlobAnon } from "../../blob";

type AiAspect = string;
type AiBrain = string;
type AiTerrain = string;
type AiGrid = string;
type AiGenerator = string;
type BoardHeight = number;
type BoardWidth = number;

export type AI<Blob extends AlgolGameBlobAnon> = {
  terrain?: { [t in AiTerrain]: TerrainDef<Blob["pos"]> };
  grids?: { [s in AiGrid]: AlgolGrid<BoardHeight, BoardWidth> };
  generators?: Generators<Blob>; // TODO with ai stuff! :/
  aspects: {
    [a in AiAspect]: AlgolVal<Blob, AiGenerator>;
  };
  brains: {
    [b in AiBrain]: Brain<Blob>;
  };
};
