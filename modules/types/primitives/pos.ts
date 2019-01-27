import {
  AlgolLogicalIfElse,
  AlgolLogicalIfActionElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIndexList
} from "./logical";
import { AlgolVal } from "./value";
import { AlgolSet } from "./set";

export type AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | Mrk
  | ["start"]
  | ["target"]
  | AlgolPosMark<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosOnlyIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

interface AlgolPosMark<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  mark: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolPosBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  battlepos: AlgolVal<Btlp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolPosTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  turnpos: AlgolVal<Turnp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolPosOnlyIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  onlyin: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

// ---------------------------------- Logicals ----------------------------------

interface AlgolPosIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIfElse<
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolPosIfActionElse<
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
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolPosPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalPlayerCase<
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolPosIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIndexList<
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
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

export type AlgolPosAnon = AlgolPos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolPosMarkAnon = AlgolPosMark<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosOnlyInAnon = AlgolPosOnlyIn<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosBattlePosAnon = AlgolPosBattlePos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosTurnPosAnon = AlgolPosTurnPos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosIfElseAnon = AlgolPosIfElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosIfActionElseAnon = AlgolPosIfActionElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosPlayerCaseAnon = AlgolPosPlayerCase<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosIndexListAnon = AlgolPosIndexList<
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

export function isAlgolPosMark(expr: AlgolPosAnon): expr is AlgolPosMarkAnon {
  return !!(expr as AlgolPosMarkAnon).mark;
}

export function isAlgolPosOnlyIn(
  expr: AlgolPosAnon
): expr is AlgolPosOnlyInAnon {
  return !!(expr as AlgolPosOnlyInAnon).onlyin;
}

export function isAlgolPosBattlePos(
  expr: AlgolPosAnon
): expr is AlgolPosBattlePosAnon {
  return !!(expr as AlgolPosBattlePosAnon).battlepos;
}

export function isAlgolPosTurnPos(
  expr: AlgolPosAnon
): expr is AlgolPosTurnPosAnon {
  return !!(expr as AlgolPosTurnPosAnon).turnpos;
}
