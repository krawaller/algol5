import {
  AlgolLogicalIfElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIfActionElse,
  AlgolLogicalIf,
  AlgolLogicalIfPlayer,
  AlgolLogicalIndexList
} from "./logical";
import { SetPosVal, ValVal, SetVal } from "./_signatures";
import { AlgolPos } from "./pos";
import { AlgolSet } from "./set";

export type AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | _T
  | ["dir"]
  | ["stopreason"]
  | ["loopid"]
  | ["player"]
  | ["otherplayer"]
  | ["turn"]
  | ["totalcount"]
  | ["neighbourcount"]
  | ["walklength"]
  | ["max"]
  | ["step"]
  | AlgolValValue<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValRead<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValBattleVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValTurnVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValIdAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValRelDir<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValGridAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValGridIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValSizeOf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValHarvest<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValSum<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValProd<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValMinus<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValIfElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValIfActionElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValPlayerCase<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValIf<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValIfPlayer<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolValIndexList<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

interface AlgolValValue<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  value: AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolValRead<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  read: SetPosVal<string, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolValBattleVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  battlevar: AlgolVal<Btlv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolValTurnVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  turnvar: AlgolVal<Turnv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolValIdAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  idat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolValPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  pos: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolValRelDir<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  reldir: ValVal<
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

interface AlgolValGridIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  gridin: [
    AlgolVal<Grid, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolValGridAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  gridat: [
    AlgolVal<Grid, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolValSizeOf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  sizeof: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolValHarvest<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  harvest: SetVal<
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

interface AlgolValSum<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  sum: AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface AlgolValProd<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  prod: AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface AlgolValMinus<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  minus: AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

// ---------------------------------- Logicals ----------------------------------

interface AlgolValIfElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIfElse<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolValIfActionElse<
  _T,
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
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolValPlayerCase<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>
  extends AlgolLogicalPlayerCase<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolValIf<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIf<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolValIfPlayer<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>
  extends AlgolLogicalIfPlayer<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolValIndexList<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>
  extends AlgolLogicalIndexList<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
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

export type AlgolValValueAnon = AlgolValValue<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolValAnon = AlgolVal<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolValReadAnon = AlgolValRead<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValBattleVarAnon = AlgolValBattleVar<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValTurnVarAnon = AlgolValTurnVar<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValIdAtAnon = AlgolValIdAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValPosAnon = AlgolValPos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValRelDirAnon = AlgolValRelDir<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValGridAtAnon = AlgolValGridAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValGridInAnon = AlgolValGridIn<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValSizeOfAnon = AlgolValSizeOf<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValHarvestAnon = AlgolValHarvest<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValSumAnon = AlgolValSum<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValProdAnon = AlgolValProd<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValMinusAnon = AlgolValMinus<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValIfElseAnon<_T = string | number> = AlgolValIfElse<
  _T,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValIfActionElseAnon<
  _T = string | number
> = AlgolValIfActionElse<
  _T,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValPlayerCaseAnon<_T = string | number> = AlgolValPlayerCase<
  _T,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValIfAnon<_T = string | number> = AlgolValIf<
  _T,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValIfPlayerAnon<_T = string | number> = AlgolValIfPlayer<
  _T,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolValIndexListAnon = AlgolValIndexList<
  string | number,
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

export function isAlgolValValue(expr: AlgolValAnon): expr is AlgolValValueAnon {
  return !!(expr as AlgolValValueAnon).value;
}

export function isAlgolValRead(expr: AlgolValAnon): expr is AlgolValReadAnon {
  return !!(expr as AlgolValReadAnon).read;
}

export function isAlgolValBattleVar(
  expr: AlgolValAnon
): expr is AlgolValBattleVarAnon {
  return !!(expr as AlgolValBattleVarAnon).battlevar;
}

export function isAlgolValTurnVar(
  expr: AlgolValAnon
): expr is AlgolValTurnVarAnon {
  return !!(expr as AlgolValTurnVarAnon).turnvar;
}

export function isAlgolValIdAt(expr: AlgolValAnon): expr is AlgolValIdAtAnon {
  return !!(expr as AlgolValIdAtAnon).idat;
}

export function isAlgolValPos(expr: AlgolValAnon): expr is AlgolValPosAnon {
  return !!(expr as AlgolValPosAnon).pos;
}

export function isAlgolValRelDir(
  expr: AlgolValAnon
): expr is AlgolValRelDirAnon {
  return !!(expr as AlgolValRelDirAnon).reldir;
}

export function isAlgolValGridAt(
  expr: AlgolValAnon
): expr is AlgolValGridAtAnon {
  return !!(expr as AlgolValGridAtAnon).gridat;
}

export function isAlgolValGridIn(
  expr: AlgolValAnon
): expr is AlgolValGridInAnon {
  return !!(expr as AlgolValGridInAnon).gridin;
}

export function isAlgolValSizeOf(
  expr: AlgolValAnon
): expr is AlgolValSizeOfAnon {
  return !!(expr as AlgolValSizeOfAnon).sizeof;
}

export function isAlgolValHarvest(
  expr: AlgolValAnon
): expr is AlgolValHarvestAnon {
  return !!(expr as AlgolValHarvestAnon).harvest;
}

export function isAlgolValSum(expr: AlgolValAnon): expr is AlgolValSumAnon {
  return !!(expr as AlgolValSumAnon).sum;
}

export function isAlgolValProd(expr: AlgolValAnon): expr is AlgolValProdAnon {
  return !!(expr as AlgolValProdAnon).prod;
}

export function isAlgolValMinus(expr: AlgolValAnon): expr is AlgolValMinusAnon {
  return !!(expr as AlgolValMinusAnon).minus;
}
