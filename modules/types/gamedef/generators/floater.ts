import { GeneratorDefAnon } from "./";
import { DrawDef } from "./draw";
import { AlgolPos, AlgolSet, AlgolVal, AlgolDirs } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type FloaterDefAnon = AlgolFloaterDef<AlgolGameBlobAnon>;

export function isAlgolFloaterDef(
  gen: GeneratorDefAnon
): gen is FloaterDefAnon {
  return (gen as FloaterDefAnon).type === "floater";
}

export type AlgolFloaterDef<Blob extends AlgolGameBlobAnon> = {
  type: "floater";
  dirs: AlgolDirs<Blob>;
  start?: AlgolPos<Blob>;
  starts?: AlgolSet<Blob>;
  blocks?: AlgolSet<Blob>;
  steps?: AlgolSet<Blob>;
  max?: AlgolVal<Blob, number>;
  draw: {
    steps?: DrawDef<Blob>;
    blocks?: DrawDef<Blob>;
  };
};
