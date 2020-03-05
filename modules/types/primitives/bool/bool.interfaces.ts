import { PosPos, SetPos, ValVal } from "../_signatures";
import { AlgolBool } from "./";
import { AlgolSet } from "../set";
import { AlgolVal } from "../value";
import { AlgolWalkerStop } from "../../gamedef";
import { AlgolGameBlobAnon } from "../../blob";
import { AlgolPos } from "../pos";

export interface AlgolBoolNot<Blob extends AlgolGameBlobAnon> {
  not: AlgolBool<Blob>;
}

export interface AlgolBoolAnd<Blob extends AlgolGameBlobAnon> {
  and: AlgolBool<Blob>[];
}

export interface AlgolBoolOr<Blob extends AlgolGameBlobAnon> {
  or: AlgolBool<Blob>[];
}

export interface AlgolBoolSamePos<Blob extends AlgolGameBlobAnon> {
  samepos: [AlgolPos<Blob>, AlgolPos<Blob>];
}

export interface AlgolBoolHigher<Blob extends AlgolGameBlobAnon> {
  higher: [AlgolPos<Blob>, AlgolPos<Blob>];
}

export interface AlgolBoolFurther<Blob extends AlgolGameBlobAnon> {
  further: [AlgolPos<Blob>, AlgolPos<Blob>];
}

export interface AlgolBoolOverlaps<Blob extends AlgolGameBlobAnon> {
  overlaps: [AlgolSet<Blob>, AlgolSet<Blob>, ...AlgolSet<Blob>[]];
}

export interface AlgolBoolIsEmpty<Blob extends AlgolGameBlobAnon> {
  isempty: AlgolSet<Blob>;
}

export interface AlgolBoolNotEmpty<Blob extends AlgolGameBlobAnon> {
  notempty: AlgolSet<Blob>;
}

export interface AlgolBoolAnyAt<Blob extends AlgolGameBlobAnon> {
  anyat: [AlgolSet<Blob>, AlgolPos<Blob>];
}

export interface AlgolBoolNoneAt<Blob extends AlgolGameBlobAnon> {
  noneat: [AlgolSet<Blob>, AlgolPos<Blob>];
}

export interface AlgolBoolCmndAvailable<Blob extends AlgolGameBlobAnon> {
  cmndavailable: AlgolVal<Blob, Blob["cmnd"] | "endTurn">;
}

export interface AlgolBoolTruthy<Blob extends AlgolGameBlobAnon> {
  truthy: AlgolVal<Blob, string | number>;
}

export interface AlgolBoolFalsy<Blob extends AlgolGameBlobAnon> {
  falsy: AlgolVal<Blob, string | number>;
}

export interface AlgolBoolMarkAvailable<Blob extends AlgolGameBlobAnon> {
  markavailable: AlgolVal<Blob, Blob["mrk"]>;
}

export interface AlgolBoolSame<Blob extends AlgolGameBlobAnon> {
  same: [AlgolVal<Blob, number>];
}

export interface AlgolBoolDifferent<Blob extends AlgolGameBlobAnon> {
  different: [AlgolVal<Blob, number>];
}

export interface AlgolBoolMoreThan<Blob extends AlgolGameBlobAnon> {
  morethan: [AlgolVal<Blob, number>];
}

export interface AlgolBoolValInList<Blob extends AlgolGameBlobAnon> {
  valinlist: AlgolVal<Blob, string | number>[];
}

export interface AlgolBoolOrtho<Blob extends AlgolGameBlobAnon> {
  ortho: AlgolVal<Blob, string | number>;
}

export interface AlgolBoolDiag<Blob extends AlgolGameBlobAnon> {
  diag: AlgolVal<Blob, string | number>;
}

export interface AlgolBoolStoppedBecause<Blob extends AlgolGameBlobAnon> {
  stoppedBecause: AlgolVal<Blob, AlgolWalkerStop>;
}
