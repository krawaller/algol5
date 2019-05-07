import { AlgolGenRef, AlgolEffect, AlgolLink, AlgolAnim } from "../../";

export interface AlgolOrderRunGenerators<
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
> {
  generators: AlgolGenRef<
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
}

export interface AlgolOrderDoEffects<
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
> {
  effects: AlgolEffect<
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
}

export interface AlgolOrderLinks<
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
> {
  links: AlgolLink<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

export interface AlgolOrderAnims<
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Gen extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string,
  Unit extends string
> {
  anims: AlgolAnim<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}
