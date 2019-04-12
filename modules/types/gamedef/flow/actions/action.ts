import { AlgolGenRef, AlgolLink } from "../../../";
import { AlgolEffect } from "../../../";

export type AlgolActionDef<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = {
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

export type AlgolEffectActionDef<
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
> = AlgolActionDef<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv> & {
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
  noEndGame?: boolean;
};
