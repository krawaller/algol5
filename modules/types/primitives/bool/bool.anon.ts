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
  AlgolBoolStoppedBecause,
  AlgolBoolFalsyPos,
  AlgolBoolTruthyPos,
} from "./bool.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

type s = string;

export type AlgolBoolAnon = AlgolBool<AlgolGameBlobAnon>;

export type AlgolBoolNotAnon = AlgolBoolNot<AlgolGameBlobAnon>;
export type AlgolBoolAndAnon = AlgolBoolAnd<AlgolGameBlobAnon>;
export type AlgolBoolOrAnon = AlgolBoolOr<AlgolGameBlobAnon>;
export type AlgolBoolSamePosAnon = AlgolBoolSamePos<AlgolGameBlobAnon>;
export type AlgolBoolHigherAnon = AlgolBoolHigher<AlgolGameBlobAnon>;
export type AlgolBoolFurtherAnon = AlgolBoolFurther<AlgolGameBlobAnon>;
export type AlgolBoolOverlapsAnon = AlgolBoolOverlaps<AlgolGameBlobAnon>;
export type AlgolBoolIsEmptyAnon = AlgolBoolIsEmpty<AlgolGameBlobAnon>;
export type AlgolBoolNotEmptyAnon = AlgolBoolNotEmpty<AlgolGameBlobAnon>;
export type AlgolBoolAnyAtAnon = AlgolBoolAnyAt<AlgolGameBlobAnon>;
export type AlgolBoolNoneAtAnon = AlgolBoolNoneAt<AlgolGameBlobAnon>;
export type AlgolBoolMarkAvailableAnon = AlgolBoolMarkAvailable<
  AlgolGameBlobAnon
>;
export type AlgolBoolCmndAvailableAnon = AlgolBoolCmndAvailable<
  AlgolGameBlobAnon
>;
export type AlgolBoolSameAnon = AlgolBoolSame<AlgolGameBlobAnon>;
export type AlgolBoolDifferentAnon = AlgolBoolDifferent<AlgolGameBlobAnon>;
export type AlgolBoolValInListAnon = AlgolBoolValInList<AlgolGameBlobAnon>;
export type AlgolBoolMoreThanAnon = AlgolBoolMoreThan<AlgolGameBlobAnon>;
export type AlgolBoolTruthyAnon = AlgolBoolTruthy<AlgolGameBlobAnon>;
export type AlgolBoolFalsyAnon = AlgolBoolFalsy<AlgolGameBlobAnon>;
export type AlgolBoolOrthoAnon = AlgolBoolOrtho<AlgolGameBlobAnon>;
export type AlgolBoolDiagAnon = AlgolBoolDiag<AlgolGameBlobAnon>;
export type AlgolBoolTruthyPosAnon = AlgolBoolTruthyPos<AlgolGameBlobAnon>;
export type AlgolBoolFalsyPosAnon = AlgolBoolFalsyPos<AlgolGameBlobAnon>;
export type AlgolBoolStoppedBecauseAnon = AlgolBoolStoppedBecause<
  AlgolGameBlobAnon
>;
