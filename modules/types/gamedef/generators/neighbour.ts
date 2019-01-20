import { DrawDef } from "./draw";
import {
  AlgolPos,
  AlgolSet,
  AlgolNumber,
  AlgolBool,
  AlgolVal,
  AlgolDirs
} from "../../";

export type NeighbourDef<
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
  type: "neighbour";
  dir?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  dirs?: AlgolDirs<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  start?: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  starts?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  condition?: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  ifover?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  unlessover?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
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
    neighbours?: DrawDef<
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
