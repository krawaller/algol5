import {
  AlgolLogicalIfElse,
  AlgolLogicalIfActionElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIf,
  AlgolLogicalIndexList
} from "./logical";
import { PosPos } from "./_signatures";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";
import { AlgolPos } from "./pos";

export type AlgolEffect<
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
  | AlgolEffectMoveAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectStompAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetTurnVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetBattleVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectPushIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectKillIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectKillAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSpawn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectSpawnIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectForPosIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectForIdIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectMulti<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectIfActionElse<
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
  | AlgolEffectPlayerCase<
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
  | AlgolEffectIndexList<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >;

interface AlgolEffectMoveAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  moveat: PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolEffectStompAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  stompat: PosPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolEffectSetTurnPos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setturnpos: [
    AlgolVal<Turnp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectSetBattlePos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setbattlepos: [
    AlgolVal<Btlp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectSetTurnVar<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setturnvar: [
    AlgolVal<Turnv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectSetBattleVar<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  setbattlevar: [
    AlgolVal<Btlv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectPushIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  pushin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectKillIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  killin: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolEffectKillAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  killat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolEffectSetAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  setat: [
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectSetIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  setin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectSetId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  setid: [
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>, // TODO - id type?
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface AlgolEffectForPosIn<
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
  forposin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

interface AlgolEffectForIdIn<
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
  foridin: [
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

interface AlgolEffectMulti<
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
  multi: AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}

interface AlgolEffectSpawn<
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
  spawn:
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        {
          [prop: string]: AlgolVal<
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
      ];
}

interface AlgolEffectSpawnIn<
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
  spawnin:
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      ]
    | [
        AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<Unit, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
        {
          [prop: string]: AlgolVal<
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
      ];
}

// ---------------------------------- Logicals ----------------------------------

interface AlgolEffectIfElse<
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
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolEffectIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  extends AlgolLogicalIf<
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolEffectIfActionElse<
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
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolEffectPlayerCase<
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
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolEffectIndexList<
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
    AlgolEffect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
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

export type AlgolEffectAnon = AlgolEffect<
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

export type AlgolEffectMoveAtAnon = AlgolEffectMoveAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectStompAtAnon = AlgolEffectStompAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSetTurnPosAnon = AlgolEffectSetTurnPos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSetBattlePosAnon = AlgolEffectSetBattlePos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSetTurnVarAnon = AlgolEffectSetTurnVar<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSetBattleVarAnon = AlgolEffectSetBattleVar<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectPushInAnon = AlgolEffectPushIn<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectKillInAnon = AlgolEffectKillIn<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectKillAtAnon = AlgolEffectKillAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSetAtAnon = AlgolEffectSetAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSetInAnon = AlgolEffectSetIn<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSetIdAnon = AlgolEffectSetId<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolEffectSpawnAnon = AlgolEffectSpawn<
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
export type AlgolEffectSpawnInAnon = AlgolEffectSpawnIn<
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
export type AlgolEffectForPosInAnon = AlgolEffectForPosIn<
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
export type AlgolEffectForIdInAnon = AlgolEffectForIdIn<
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
export type AlgolEffectMultiAnon = AlgolEffectMulti<
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

export function isAlgolEffectMoveAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectMoveAtAnon {
  return !!(expr as AlgolEffectMoveAtAnon).moveat;
}

export function isAlgolEffectStompAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectStompAtAnon {
  return !!(expr as AlgolEffectStompAtAnon).stompat;
}

export function isAlgolEffectSetTurnPos(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetTurnPosAnon {
  return !!(expr as AlgolEffectSetTurnPosAnon).setturnpos;
}

export function isAlgolEffectSetBattlePos(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetBattlePosAnon {
  return !!(expr as AlgolEffectSetBattlePosAnon).setbattlepos;
}

export function isAlgolEffectSetTurnVar(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetTurnVarAnon {
  return !!(expr as AlgolEffectSetTurnVarAnon).setturnvar;
}

export function isAlgolEffectSetBattleVar(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetBattleVarAnon {
  return !!(expr as AlgolEffectSetBattleVarAnon).setbattlevar;
}

export function isAlgolEffectPushIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectPushInAnon {
  return !!(expr as AlgolEffectPushInAnon).pushin;
}

export function isAlgolEffectKillIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectKillInAnon {
  return !!(expr as AlgolEffectKillInAnon).killin;
}

export function isAlgolEffectKillAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectKillAtAnon {
  return !!(expr as AlgolEffectKillAtAnon).killat;
}

export function isAlgolEffectSetAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetAtAnon {
  return !!(expr as AlgolEffectSetAtAnon).setat;
}

export function isAlgolEffectSetIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetInAnon {
  return !!(expr as AlgolEffectSetInAnon).setin;
}

export function isAlgolEffectSetId(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetIdAnon {
  return !!(expr as AlgolEffectSetIdAnon).setid;
}

export function isAlgolEffectSpawn(
  expr: AlgolEffectAnon
): expr is AlgolEffectSpawnAnon {
  return !!(expr as AlgolEffectSpawnAnon).spawn;
}

export function isAlgolEffectSpawnIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectSpawnInAnon {
  return !!(expr as AlgolEffectSpawnInAnon).spawnin;
}

export function isAlgolEffectForPosIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectForPosInAnon {
  return !!(expr as AlgolEffectForPosInAnon).forposin;
}

export function isAlgolEffectForIdIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectForIdInAnon {
  return !!(expr as AlgolEffectForIdInAnon).foridin;
}

export function isAlgolEffectMulti(
  expr: AlgolEffectAnon
): expr is AlgolEffectMultiAnon {
  return !!(expr as AlgolEffectMultiAnon).multi;
}
