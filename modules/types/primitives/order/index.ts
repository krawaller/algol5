export * from "./order.anon";
export * from "./order.interfaces";
export * from "./order.guard";

import {
  AlgolOrderRunGenerators,
  AlgolOrderDoEffects,
  AlgolOrderLinks,
  AlgolOrderAnims
} from "./order.interfaces";

import { AlgolStatement } from "../../";

export type AlgolOrder<
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
  | AlgolOrderLinks<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolOrderAnims<
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
