import { GeneratorDefAnon } from "./";
import { DrawDef } from "./draw";
import { AlgolPos, AlgolSet, AlgolBool, AlgolVal, AlgolDirs } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type NeighbourDefAnon = NeighbourDef<AlgolGameBlobAnon>;

export function isNeighbourDef(gen: GeneratorDefAnon): gen is NeighbourDefAnon {
  return (gen as NeighbourDefAnon).type === "neighbour";
}

export type NeighbourDef<Blob extends AlgolGameBlobAnon> = {
  type: "neighbour";
  dir?: AlgolVal<Blob, string | number>;
  dirs?: AlgolDirs<Blob>;
  start?: AlgolPos<Blob>;
  starts?: AlgolSet<Blob>;
  condition?: AlgolBool<Blob>;
  ifover?: AlgolSet<Blob>;
  unlessover?: AlgolSet<Blob>;
  count?: AlgolSet<Blob>;
  draw: {
    start?: DrawDef<Blob>;
    neighbours?: DrawDef<Blob>;
    counted?: DrawDef<Blob>;
  };
};
