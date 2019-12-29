import { AlgolBool } from "./";

import {
  AlgolBoolNot,
  AlgolBoolAnd,
  AlgolBoolOr,
  AlgolBoolSamePos,
  AlgolBoolDifferent,
  AlgolBoolHigher,
  AlgolBoolFurther,
  AlgolBoolOverlaps,
  AlgolBoolIsEmpty,
  AlgolBoolNotEmpty,
  AlgolBoolAnyAt,
  AlgolBoolNoneAt,
  AlgolBoolCmndAvailable,
  AlgolBoolMarkAvailable,
  AlgolBoolSame,
  AlgolBoolValInList,
  AlgolBoolMoreThan,
  AlgolBoolTruthy,
  AlgolBoolFalsy,
  AlgolBoolDiag,
  AlgolBoolOrtho,
} from "./bool.interfaces";

type s = string;

export type AlgolBoolAnon = AlgolBool<s, s, s, s, s, s, s, s>;

export type AlgolBoolNotAnon = AlgolBoolNot<s, s, s, s, s, s, s, s>;
export type AlgolBoolAndAnon = AlgolBoolAnd<s, s, s, s, s, s, s, s>;
export type AlgolBoolOrAnon = AlgolBoolOr<s, s, s, s, s, s, s, s>;
export type AlgolBoolSamePosAnon = AlgolBoolSamePos<s, s, s, s, s, s, s, s>;
export type AlgolBoolHigherAnon = AlgolBoolHigher<s, s, s, s, s, s, s, s>;
export type AlgolBoolFurtherAnon = AlgolBoolFurther<s, s, s, s, s, s, s, s>;
export type AlgolBoolOverlapsAnon = AlgolBoolOverlaps<s, s, s, s, s, s, s, s>;
export type AlgolBoolIsEmptyAnon = AlgolBoolIsEmpty<s, s, s, s, s, s, s, s>;
export type AlgolBoolNotEmptyAnon = AlgolBoolNotEmpty<s, s, s, s, s, s, s, s>;
export type AlgolBoolAnyAtAnon = AlgolBoolAnyAt<s, s, s, s, s, s, s, s>;
export type AlgolBoolNoneAtAnon = AlgolBoolNoneAt<s, s, s, s, s, s, s, s>;
export type AlgolBoolMarkAvailableAnon = AlgolBoolMarkAvailable<
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;
export type AlgolBoolCmndAvailableAnon = AlgolBoolCmndAvailable<
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;
export type AlgolBoolSameAnon = AlgolBoolSame<s, s, s, s, s, s, s, s>;
export type AlgolBoolDifferentAnon = AlgolBoolDifferent<s, s, s, s, s, s, s, s>;
export type AlgolBoolValInListAnon = AlgolBoolValInList<s, s, s, s, s, s, s, s>;
export type AlgolBoolMoreThanAnon = AlgolBoolMoreThan<s, s, s, s, s, s, s, s>;
export type AlgolBoolTruthyAnon = AlgolBoolTruthy<s, s, s, s, s, s, s, s>;
export type AlgolBoolFalsyAnon = AlgolBoolFalsy<s, s, s, s, s, s, s, s>;
export type AlgolBoolOrthoAnon = AlgolBoolOrtho<s, s, s, s, s, s, s, s>;
export type AlgolBoolDiagAnon = AlgolBoolDiag<s, s, s, s, s, s, s, s>;
