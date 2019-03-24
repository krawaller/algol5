import { AlgolVal, AlgolGenRef, AlgolLink } from "../../";
import { AlgolEffect } from "../../";

export type CommandDef<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> = {
  nodeadends?: boolean;
  applyEffects?: AlgolEffect<
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv,
    Unit
  >[];
  applyEffect?: AlgolEffect<
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv,
    Unit
  >;
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
