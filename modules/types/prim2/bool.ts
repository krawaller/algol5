import { IfElse, IfActionElse, If, PlayerCase } from "./_logical";
import { PosPos, SetSet, SetPos, ValVal } from "./_signatures";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";

export type AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | ["true"]
  | ["false"]
  | BoolNot<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolAnd<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolOr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolSamePos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolHigher<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolFurther<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolOverlaps<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolIsEmpty<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolNotEmpty<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolAnyAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolNoneAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolMarkAvailable<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolCmndAvailable<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolSame<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolDifferent<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface BoolNot<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  not: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolAnd<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  and: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

interface BoolOr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  or: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

interface BoolSamePos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  samepos: PosPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolHigher<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  higher: PosPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolFurther<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  further: PosPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolOverlaps<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  overlaps: SetSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolIsEmpty<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  isempty: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolNotEmpty<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  notempty: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolAnyAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  anyat: SetPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolNoneAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  noneat: SetPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolCmndAvailable<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  cmndavailable: AlgolVal<
    Cmnd | "endturn",
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface BoolMarkAvailable<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  markavailable: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolSame<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  same: ValVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface BoolDifferent<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  different: ValVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface BoolIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface BoolIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface BoolPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
