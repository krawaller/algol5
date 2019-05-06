import {
  AlgolAnimEnterFrom,
  AlgolAnimExitTo,
  AlgolAnimGhost
} from "./anim.interfaces";

export * from "./anim.interfaces";

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
> =
  | AlgolAnimEnterFrom<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolAnimExitTo<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolAnimGhost<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>;
