export * from "./order.anon";
export * from "./order.interfaces";
export * from "./order.guard";

import {
  AlgolOrderRunGenerators,
  AlgolOrderDoEffects,
  AlgolOrderLinks
} from "./order.interfaces";

import { AlgolStatement } from "../../";

export type AlgolOrder<
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
> = AlgolStatement<
  AlgolOrderInner<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

export type AlgolOrderInner<
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
> =
  | ["unitLayers"]
  | AlgolOrderRunGenerators<
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
    >
  | AlgolOrderDoEffects<
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
    >
  | AlgolOrderLinks<
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
    >;
