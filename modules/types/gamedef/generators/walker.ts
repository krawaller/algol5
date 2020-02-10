import { GeneratorDefAnon } from "./";
import { DrawDef } from "./draw";
import { AlgolPos, AlgolSet, AlgolVal, AlgolDirs } from "../../";

export type WalkerDefAnon = WalkerDef<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export function isWalkerDef(gen: GeneratorDefAnon): gen is WalkerDefAnon {
  return (gen as WalkerDefAnon).type === "walker";
}

export type AlgolWalkerStop = "LENGTH" | "BOUNDS" | "STEPS" | "BLOCKS";

export type WalkerDef<
  ArtifactLayer,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = {
  type: "walker";
  dir?: AlgolVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  dirs?: AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  start?: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  starts?: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  steps?: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  stopPrio?: AlgolWalkerStop[];
  blocks?: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  count?: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  startasstep?: boolean;
  max?: AlgolVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  draw: {
    start?: DrawDef<
      ArtifactLayer,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
    steps?: DrawDef<
      ArtifactLayer,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
    block?: DrawDef<
      ArtifactLayer,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
    last?: DrawDef<
      ArtifactLayer,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
    all?: DrawDef<
      ArtifactLayer,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
    counted?: DrawDef<
      ArtifactLayer,
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
  };
};
