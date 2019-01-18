import { DrawDef } from "./draw";
import { AlgolPos, AlgolSet, AlgolNumber, AlgolVal, AlgolDirs } from "../../";

export type WalkerDef<
  ArtifactLayer,
  Btlp,
  Btlv,
  Cmnd,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = {
  type: "walker";
  dir?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  dirs?: AlgolDirs<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  start?: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  starts?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  steps?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  testblocksbeforesteps?: boolean;
  blocks?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  count?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  startasstep?: boolean;
  max?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  draw: {
    start?: DrawDef<ArtifactLayer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
    steps?: DrawDef<ArtifactLayer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
    block?: DrawDef<ArtifactLayer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
    last?: DrawDef<ArtifactLayer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
    all?: DrawDef<ArtifactLayer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
    count?: DrawDef<ArtifactLayer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  };
};
