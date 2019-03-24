import { AlgolVal, AlgolSet, AlgolGenRef, AlgolLink } from "../../";

export type MarkDef<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv> = {
  nodeadends?: boolean;
  from: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  link?: AlgolLink<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  links?: AlgolLink<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
  runGenerator?: AlgolGenRef<
    Btlp,
    Btlv,
    Cmnd,
    Gen,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  runGenerators?: AlgolGenRef<
    Btlp,
    Btlv,
    Cmnd,
    Gen,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
};
