import { GeneratorDefAnon } from "./";
import { DrawDef } from "./draw";
import { AlgolPos, AlgolSet, AlgolVal, AlgolDirs } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type WalkerDefAnon = WalkerDef<AlgolGameBlobAnon>;

export function isWalkerDef(gen: GeneratorDefAnon): gen is WalkerDefAnon {
  return (gen as WalkerDefAnon).type === "walker";
}

export type AlgolWalkerStop =
  | "reachedmax"
  | "outofbounds"
  | "nomoresteps"
  | "hitblock";

export type WalkerDef<Blob extends AlgolGameBlobAnon> = {
  type: "walker";
  dir?: AlgolVal<Blob, string | number>;
  dirs?: AlgolDirs<Blob>;
  start?: AlgolPos<Blob>;
  starts?: AlgolSet<Blob>;
  steps?: AlgolSet<Blob>;
  stopPrio?: AlgolWalkerStop[];
  blocks?: AlgolSet<Blob>;
  count?: AlgolSet<Blob>;
  startasstep?: boolean;
  max?: AlgolVal<Blob, string | number>;
  draw: {
    start?: DrawDef<Blob>;
    steps?: DrawDef<Blob>;
    block?: DrawDef<Blob>;
    last?: DrawDef<Blob>;
    all?: DrawDef<Blob>;
    counted?: DrawDef<Blob>;
  };
};
