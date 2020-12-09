import { AlgolBool } from "./";
import { AlgolSet } from "../set";
import { AlgolVal } from "../value";
import { AlgolWalkerStop } from "../../gamedef";
import { AlgolGameBlobAnon } from "../../blob";
import { AlgolPos } from "../pos";

export type AlgolBoolNot<Blob extends AlgolGameBlobAnon> = {
  not: AlgolBool<Blob>;
};

export type AlgolBoolAnd<Blob extends AlgolGameBlobAnon> = {
  and: AlgolBool<Blob>[];
};

export type AlgolBoolOr<Blob extends AlgolGameBlobAnon> = {
  or: AlgolBool<Blob>[];
};

export type AlgolBoolSamePos<Blob extends AlgolGameBlobAnon> = {
  samepos: [AlgolPos<Blob>, AlgolPos<Blob>];
};

export type AlgolBoolHigher<Blob extends AlgolGameBlobAnon> = {
  higher: [AlgolPos<Blob>, AlgolPos<Blob>];
};

export type AlgolBoolFurther<Blob extends AlgolGameBlobAnon> = {
  further: [AlgolPos<Blob>, AlgolPos<Blob>];
};

export type AlgolBoolOverlaps<Blob extends AlgolGameBlobAnon> = {
  overlaps: [AlgolSet<Blob>, AlgolSet<Blob>, ...AlgolSet<Blob>[]];
};

export type AlgolBoolIsEmpty<Blob extends AlgolGameBlobAnon> = {
  isempty: AlgolSet<Blob>;
};

export type AlgolBoolNotEmpty<Blob extends AlgolGameBlobAnon> = {
  notempty: AlgolSet<Blob>;
};

export type AlgolBoolAnyAt<Blob extends AlgolGameBlobAnon> = {
  anyat: [AlgolSet<Blob>, AlgolPos<Blob>];
};

export type AlgolBoolNoneAt<Blob extends AlgolGameBlobAnon> = {
  noneat: [AlgolSet<Blob>, AlgolPos<Blob>];
};

export type AlgolBoolCmndAvailable<Blob extends AlgolGameBlobAnon> = {
  cmndavailable: AlgolVal<Blob, Blob["cmnd"] | "endTurn">;
};

export type AlgolBoolTruthy<Blob extends AlgolGameBlobAnon> = {
  truthy: AlgolVal<Blob, string | number>;
};

export type AlgolBoolFalsy<Blob extends AlgolGameBlobAnon> = {
  falsy: AlgolVal<Blob, string | number>;
};

export type AlgolBoolMarkAvailable<Blob extends AlgolGameBlobAnon> = {
  markavailable: AlgolVal<Blob, Blob["mrk"]>;
};

export type AlgolBoolSame<Blob extends AlgolGameBlobAnon> = {
  same: [AlgolVal<Blob, string | number>, AlgolVal<Blob, string | number>];
};

export type AlgolBoolDifferent<Blob extends AlgolGameBlobAnon> = {
  different: [AlgolVal<Blob, string | number>, AlgolVal<Blob, string | number>];
};

export type AlgolBoolMoreThan<Blob extends AlgolGameBlobAnon> = {
  morethan: [AlgolVal<Blob, number>, AlgolVal<Blob, string | number>];
};

export type AlgolBoolLessThan<Blob extends AlgolGameBlobAnon> = {
  lessthan: [AlgolVal<Blob, number>, AlgolVal<Blob, string | number>];
};

export type AlgolBoolValInList<Blob extends AlgolGameBlobAnon> = {
  valinlist: AlgolVal<Blob, string | number>[];
};

export type AlgolBoolOrtho<Blob extends AlgolGameBlobAnon> = {
  ortho: AlgolVal<Blob, string | number>;
};

export type AlgolBoolDiag<Blob extends AlgolGameBlobAnon> = {
  diag: AlgolVal<Blob, string | number>;
};

export type AlgolBoolUphill<Blob extends AlgolGameBlobAnon> = {
  uphill: AlgolVal<Blob, string | number>;
};

export type AlgolBoolDownhill<Blob extends AlgolGameBlobAnon> = {
  downhill: AlgolVal<Blob, string | number>;
};

export type AlgolBoolHorisontal<Blob extends AlgolGameBlobAnon> = {
  horisontal: AlgolVal<Blob, string | number>;
};

export type AlgolBoolVertical<Blob extends AlgolGameBlobAnon> = {
  vertical: AlgolVal<Blob, string | number>;
};

export type AlgolBoolStoppedBecause<Blob extends AlgolGameBlobAnon> = {
  stoppedBecause: AlgolVal<Blob, AlgolWalkerStop>;
};

export type AlgolBoolTruthyPos<Blob extends AlgolGameBlobAnon> = {
  truthypos: AlgolPos<Blob>;
};

export type AlgolBoolFalsyPos<Blob extends AlgolGameBlobAnon> = {
  falsypos: AlgolPos<Blob>;
};

export type AlgolBoolHasCommonBits<Blob extends AlgolGameBlobAnon> = {
  hascommonbits: [AlgolVal<Blob, number>, AlgolVal<Blob, number>];
};

export type AlgolBoolBitContains<Blob extends AlgolGameBlobAnon> = {
  bitcontains: [AlgolVal<Blob, number>, AlgolVal<Blob, number>];
};
