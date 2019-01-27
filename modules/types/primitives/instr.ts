import {
  AlgolLogicalIfElse,
  AlgolLogicalIfActionElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIfPlayer,
  AlgolLogicalIf,
  AlgolLogicalIndexList
} from "./logical";
import { AlgolVal } from "./value";
import { AlgolPos } from "./pos";

export type AlgolInstrAnon = AlgolInstr<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolInstr<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> =
  | string
  | Cmnd
  | Unit
  | AlgolInstrVal<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrPluralize<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrNameAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolInstrLine<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrOrList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrIfActionElse<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >
  | AlgolInstrIfPlayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolInstrIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>;

interface AlgolInstrPluralize<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  pluralize: [
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

interface AlgolInstrVal<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  value: AlgolVal<
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

interface AlgolInstrNameAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  nameat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolInstrPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  pos: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolInstrOrList<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  orlist: AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}

interface AlgolInstrLine<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  line: AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}

// ---------------------------------- Logicals ----------------------------------

interface AlgolInstrIfPlayer<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalIfPlayer<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolInstrIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  extends AlgolLogicalIf<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolInstrIfElse<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalIfElse<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolInstrIfActionElse<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalIfActionElse<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolInstrPlayerCase<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalPlayerCase<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolInstrIndexList<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalIndexList<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
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

export type AlgolInstrValAnon = AlgolInstrVal<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrPluralizeAnon = AlgolInstrPluralize<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrPosAnon = AlgolInstrPos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrNameAtAnon = AlgolInstrNameAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrLineAnon = AlgolInstrLine<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrOrListAnon = AlgolInstrOrList<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrIfElseAnon = AlgolInstrIfElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrIfActionElseAnon = AlgolInstrIfActionElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrIfPlayerAnon = AlgolInstrIfPlayer<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrIfAnon = AlgolInstrIf<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrPlayerCaseAnon = AlgolInstrPlayerCase<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolInstrIndexListAnon = AlgolInstrIndexList<
  string,
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

export function isAlgolInstrVal(
  expr: AlgolInstrAnon
): expr is AlgolInstrValAnon {
  return !!(expr as AlgolInstrValAnon).value;
}

export function isAlgolInstrPluralize(
  expr: AlgolInstrAnon
): expr is AlgolInstrPluralizeAnon {
  return !!(expr as AlgolInstrPluralizeAnon).pluralize;
}

export function isAlgolInstrPos(
  expr: AlgolInstrAnon
): expr is AlgolInstrPosAnon {
  return !!(expr as AlgolInstrPosAnon).pos;
}

export function isAlgolInstrNameAt(
  expr: AlgolInstrAnon
): expr is AlgolInstrNameAtAnon {
  return !!(expr as AlgolInstrNameAtAnon).nameat;
}

export function isAlgolInstrLine(
  expr: AlgolInstrAnon
): expr is AlgolInstrLineAnon {
  return !!(expr as AlgolInstrLineAnon).line;
}

export function isAlgolInstrOrList(
  expr: AlgolInstrAnon
): expr is AlgolInstrOrListAnon {
  return !!(expr as AlgolInstrOrListAnon).orlist;
}
