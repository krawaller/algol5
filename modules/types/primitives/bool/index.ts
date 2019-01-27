export * from "./bool.anon";
export * from "./bool.interfaces";
export * from "./bool.logical";
export * from "./bool.guard";

import {
  AlgolBoolNot,
  AlgolBoolAnd,
  AlgolBoolAnyAt,
  AlgolBoolCmndAvailable,
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
  AlgolBoolOverlaps,
  AlgolBoolSame,
  AlgolBoolSamePos,
  AlgolBoolTruthy,
  AlgolBoolValInList
} from "./bool.interfaces";

import {
  AlgolBoolIfElse,
  AlgolBoolIfActionElse,
  AlgolBoolPlayerCase,
  AlgolBoolIndexList
} from "./bool.logical";

export type AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
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
  | AlgolBoolIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolBoolIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
