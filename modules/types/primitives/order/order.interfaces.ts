import { AlgolGenRef, AlgolEffect } from "../../";

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
