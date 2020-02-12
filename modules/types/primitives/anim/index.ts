import { AlgolStatement } from "../../";

import {
  AlgolAnimEnterFrom,
  AlgolAnimEnterIn,
  AlgolAnimExitTo,
  AlgolAnimExitIn,
  AlgolAnimGhost,
  AlgolAnimGhostFromIn,
  AlgolAnimGhostToIn,
} from "./anim.interfaces";

export * from "./anim.interfaces";
export * from "./anim.anon";
export * from "./anim.guard";

export type AlgolAnim<
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string,
  Unit extends string
> = AlgolStatement<
  AlgolAnimInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

export type AlgolAnimInner<
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string,
  Unit extends string
> =
  | AlgolAnimEnterFrom<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolAnimEnterIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolAnimExitTo<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolAnimExitIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolAnimGhost<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolAnimGhostFromIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolAnimGhostToIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>;
