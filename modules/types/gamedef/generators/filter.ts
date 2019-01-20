import { AlgolBool, AlgolVal } from "../../";

export type FilterDef<
  ArtifactLayer,
  Btlp,
  Btlv,
  Cmnd,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = {
  type: "filter";
  layer: any;
  condition?: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  tolayer: AlgolVal<ArtifactLayer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  matching?: any;
};
