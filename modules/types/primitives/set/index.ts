export * from "./set.anon";
export * from "./set.guard";
export * from "./set.interface";

import {
  AlgolSetGroupAt,
  AlgolSetIntersect,
  AlgolSetLayer,
  AlgolSetSingle,
  AlgolSetSingles,
  AlgolSetSubtract,
  AlgolSetUnion,
  AlgolSetExceptPos
} from "./set.interface";

import { AlgolExpression } from "../../";

export type AlgolSet<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = AlgolExpression<
  AlgolSetInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

type AlgolSetInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | Layer
  | ["empty"]
  | AlgolSetLayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSingle<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSingles<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetGroupAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetUnion<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIntersect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSubtract<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetExceptPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
