export * from "./bool.anon";
export * from "./bool.interfaces";
export * from "./bool.guard";

import {
  AlgolBoolNot,
  AlgolBoolAnd,
  AlgolBoolAnyAt,
  AlgolBoolCmndAvailable,
  AlgolBoolDiag,
  AlgolBoolDifferent,
  AlgolBoolFalsy,
  AlgolBoolFurther,
  AlgolBoolHigher,
  AlgolBoolIsEmpty,
  AlgolBoolMarkAvailable,
  AlgolBoolMoreThan,
  AlgolBoolNoneAt,
  AlgolBoolNotEmpty,
  AlgolBoolOr,
  AlgolBoolOrtho,
  AlgolBoolOverlaps,
  AlgolBoolSame,
  AlgolBoolSamePos,
  AlgolBoolTruthy,
  AlgolBoolValInList,
  AlgolBoolStoppedBecause,
} from "./bool.interfaces";

import { AlgolExpression } from "../../";

export type AlgolBool<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = AlgolExpression<
  AlgolBoolInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

type AlgolBoolInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | ["true"]
  | ["false"]
  | AlgolBoolNot<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolAnd<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolOr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolSamePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolHigher<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolFurther<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolOverlaps<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolIsEmpty<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolNotEmpty<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolAnyAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolNoneAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolMarkAvailable<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolCmndAvailable<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolSame<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolDifferent<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolValInList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolMoreThan<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolTruthy<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolFalsy<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolOrtho<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolDiag<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolStoppedBecause<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
