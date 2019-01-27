import {
  AlgolLogicalIfElse,
  AlgolLogicalIfActionElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIndexList
} from "./logical";
import { PosPos, SetSet, SetPos, ValVal } from "./_signatures";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";

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

interface AlgolBoolNot<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  not: AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolAnd<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  and: AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface AlgolBoolOr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  or: AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface AlgolBoolSamePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  samepos: PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolHigher<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  higher: PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolFurther<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  further: PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolOverlaps<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  overlaps: SetSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolIsEmpty<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  isempty: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolNotEmpty<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  notempty: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolAnyAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  anyat: SetPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolNoneAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  noneat: SetPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolBoolCmndAvailable<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  cmndavailable: AlgolVal<
    Cmnd | "endturn",
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface AlgolBoolTruthy<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  truthy: AlgolVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface AlgolBoolFalsy<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  falsy: AlgolVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface AlgolBoolMarkAvailable<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  markavailable: AlgolVal<
    Mrk,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface AlgolBoolSame<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  same: ValVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface AlgolBoolDifferent<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  different: ValVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface AlgolBoolMoreThan<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  morethan: ValVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface AlgolBoolValInList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  valinlist: AlgolVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
}

// ---------------------------------- Logicals ----------------------------------

interface AlgolBoolIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIfElse<
    AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolBoolIfActionElse<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>
  extends AlgolLogicalIfActionElse<
    AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolBoolPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalPlayerCase<
    AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolBoolIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIndexList<
    AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

// ---------------------------------- Anon versions ----------------------------------

export type AlgolBoolAnon = AlgolBool<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolBoolNotAnon = AlgolBoolNot<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolAndAnon = AlgolBoolAnd<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolOrAnon = AlgolBoolOr<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolSamePosAnon = AlgolBoolSamePos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolHigherAnon = AlgolBoolHigher<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolFurtherAnon = AlgolBoolFurther<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolOverlapsAnon = AlgolBoolOverlaps<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolIsEmptyAnon = AlgolBoolIsEmpty<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolNotEmptyAnon = AlgolBoolNotEmpty<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolAnyAtAnon = AlgolBoolAnyAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolNoneAtAnon = AlgolBoolNoneAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolMarkAvailableAnon = AlgolBoolMarkAvailable<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolCmndAvailableAnon = AlgolBoolCmndAvailable<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolSameAnon = AlgolBoolSame<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolDifferentAnon = AlgolBoolDifferent<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolValInListAnon = AlgolBoolValInList<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolMoreThanAnon = AlgolBoolMoreThan<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolTruthyAnon = AlgolBoolTruthy<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolFalsyAnon = AlgolBoolFalsy<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolIfElseAnon = AlgolBoolIfElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolIfActionElseAnon = AlgolBoolIfActionElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolPlayerCaseAnon = AlgolBoolPlayerCase<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolBoolIndexListAnon = AlgolBoolIndexList<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

// ---------------------------------- Type Guards ----------------------------------

export function isAlgolBoolNot(expr: AlgolBoolAnon): expr is AlgolBoolNotAnon {
  return !!(expr as AlgolBoolNotAnon).not;
}

export function isAlgolBoolAnd(expr: AlgolBoolAnon): expr is AlgolBoolAndAnon {
  return !!(expr as AlgolBoolAndAnon).and;
}

export function isAlgolBoolOr(expr: AlgolBoolAnon): expr is AlgolBoolOrAnon {
  return !!(expr as AlgolBoolOrAnon).or;
}

export function isAlgolBoolSamePos(
  expr: AlgolBoolAnon
): expr is AlgolBoolSamePosAnon {
  return !!(expr as AlgolBoolSamePosAnon).samepos;
}

export function isAlgolBoolHigher(
  expr: AlgolBoolAnon
): expr is AlgolBoolHigherAnon {
  return !!(expr as AlgolBoolHigherAnon).higher;
}

export function isAlgolBoolFurther(
  expr: AlgolBoolAnon
): expr is AlgolBoolFurtherAnon {
  return !!(expr as AlgolBoolFurtherAnon).further;
}

export function isAlgolBoolOverlaps(
  expr: AlgolBoolAnon
): expr is AlgolBoolOverlapsAnon {
  return !!(expr as AlgolBoolOverlapsAnon).overlaps;
}

export function isAlgolBoolIsEmpty(
  expr: AlgolBoolAnon
): expr is AlgolBoolIsEmptyAnon {
  return !!(expr as AlgolBoolIsEmptyAnon).isempty;
}

export function isAlgolBoolNotEmpty(
  expr: AlgolBoolAnon
): expr is AlgolBoolNotEmptyAnon {
  return !!(expr as AlgolBoolNotEmptyAnon).notempty;
}

export function isAlgolBoolAnyAt(
  expr: AlgolBoolAnon
): expr is AlgolBoolAnyAtAnon {
  return !!(expr as AlgolBoolAnyAtAnon).anyat;
}

export function isAlgolBoolNoneAt(
  expr: AlgolBoolAnon
): expr is AlgolBoolNoneAtAnon {
  return !!(expr as AlgolBoolNoneAtAnon).noneat;
}

export function isAlgolBoolMarkAvailable(
  expr: AlgolBoolAnon
): expr is AlgolBoolMarkAvailableAnon {
  return !!(expr as AlgolBoolMarkAvailableAnon).markavailable;
}

export function isAlgolBoolCmndAvailable(
  expr: AlgolBoolAnon
): expr is AlgolBoolCmndAvailableAnon {
  return !!(expr as AlgolBoolCmndAvailableAnon).cmndavailable;
}

export function isAlgolBoolSame(
  expr: AlgolBoolAnon
): expr is AlgolBoolSameAnon {
  return !!(expr as AlgolBoolSameAnon).same;
}

export function isAlgolBoolDifferent(
  expr: AlgolBoolAnon
): expr is AlgolBoolDifferentAnon {
  return !!(expr as AlgolBoolDifferentAnon).different;
}

export function isAlgolBoolValInList(
  expr: AlgolBoolAnon
): expr is AlgolBoolValInListAnon {
  return !!(expr as AlgolBoolValInListAnon).valinlist;
}

export function isAlgolBoolMoreThan(
  expr: AlgolBoolAnon
): expr is AlgolBoolMoreThanAnon {
  return !!(expr as AlgolBoolMoreThanAnon).morethan;
}

export function isAlgolBoolTruthy(
  expr: AlgolBoolAnon
): expr is AlgolBoolTruthyAnon {
  return !!(expr as AlgolBoolTruthyAnon).truthy;
}

export function isAlgolBoolFalsy(
  expr: AlgolBoolAnon
): expr is AlgolBoolFalsyAnon {
  return !!(expr as AlgolBoolFalsyAnon).falsy;
}
