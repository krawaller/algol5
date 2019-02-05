import {
  AlgolEffectAnon,
  AlgolEffectForIdInAnon,
  AlgolEffectForPosInAnon,
  AlgolEffectKillAtAnon,
  AlgolEffectKillInAnon,
  AlgolEffectKillIdAnon,
  AlgolEffectMoveAtAnon,
  AlgolEffectMoveIdAnon,
  AlgolEffectMultiAnon,
  AlgolEffectPushInAnon,
  AlgolEffectSetAtAnon,
  AlgolEffectSetBattlePosAnon,
  AlgolEffectSetBattleVarAnon,
  AlgolEffectSetIdAnon,
  AlgolEffectSetInAnon,
  AlgolEffectSetTurnPosAnon,
  AlgolEffectSetTurnVarAnon,
  AlgolEffectSpawnAnon,
  AlgolEffectSpawnInAnon,
  AlgolEffectStompAtAnon,
  AlgolEffectStompIdAnon
} from "./effect.anon";

export function isAlgolEffectMoveAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectMoveAtAnon {
  return !!(expr as AlgolEffectMoveAtAnon).moveat;
}

export function isAlgolEffectMoveId(
  expr: AlgolEffectAnon
): expr is AlgolEffectMoveIdAnon {
  return !!(expr as AlgolEffectMoveIdAnon).moveid;
}

export function isAlgolEffectStompAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectStompAtAnon {
  return !!(expr as AlgolEffectStompAtAnon).stompat;
}

export function isAlgolEffectStompId(
  expr: AlgolEffectAnon
): expr is AlgolEffectStompIdAnon {
  return !!(expr as AlgolEffectStompIdAnon).stompid;
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

export function isAlgolEffectKillId(
  expr: AlgolEffectAnon
): expr is AlgolEffectKillIdAnon {
  return !!(expr as AlgolEffectKillIdAnon).killid;
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
