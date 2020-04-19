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
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolBool<Blob extends AlgolGameBlobAnon> = AlgolExpression<
  Blob,
  AlgolBoolInner<Blob>
>;

type AlgolBoolInner<Blob extends AlgolGameBlobAnon> =
  | ["true"]
  | ["false"]
  | ["canEndTurn"]
  | AlgolBoolNot<Blob>
  | AlgolBoolAnd<Blob>
  | AlgolBoolOr<Blob>
  | AlgolBoolSamePos<Blob>
  | AlgolBoolHigher<Blob>
  | AlgolBoolFurther<Blob>
  | AlgolBoolOverlaps<Blob>
  | AlgolBoolIsEmpty<Blob>
  | AlgolBoolNotEmpty<Blob>
  | AlgolBoolAnyAt<Blob>
  | AlgolBoolNoneAt<Blob>
  | AlgolBoolMarkAvailable<Blob>
  | AlgolBoolCmndAvailable<Blob>
  | AlgolBoolSame<Blob>
  | AlgolBoolDifferent<Blob>
  | AlgolBoolValInList<Blob>
  | AlgolBoolMoreThan<Blob>
  | AlgolBoolTruthy<Blob>
  | AlgolBoolFalsy<Blob>
  | AlgolBoolOrtho<Blob>
  | AlgolBoolDiag<Blob>
  | AlgolBoolStoppedBecause<Blob>;
