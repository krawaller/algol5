export * from "./genref.anon";

import { AlgolStatement } from "../../";

export type AlgolGenRef<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = AlgolStatement<
  AlgolGenRefInner<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

export type AlgolGenRefInner<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = Gen;
