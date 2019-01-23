import { IfElse, IfActionElse, PlayerCase } from "./_logical";
import { PosPos, SetSet, SetPos, ValVal, NumNum } from "./_signatures";
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
  | AlgolBoolPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

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
  morethan: NumNum<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
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

interface AlgolBoolIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
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
  extends IfActionElse<
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
  extends PlayerCase<
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

// ---------------------------

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
