import {
  AlgolEffectAnon,
  AlgolEffectKillAtAnon,
  AlgolEffectKillInAnon,
  AlgolEffectKillIdAnon,
  AlgolEffectMoveAtAnon,
  AlgolEffectMoveIdAnon,
  AlgolEffectPushInAnon,
  AlgolEffectPushAtAnon,
  AlgolEffectSetAtAnon,
  AlgolEffectSetBattlePosAnon,
  AlgolEffectSetBattleVarAnon,
  AlgolEffectSetIdAnon,
  AlgolEffectSetInAnon,
  AlgolEffectSetTurnPosAnon,
  AlgolEffectSetTurnVarAnon,
  AlgolEffectSpawnAtAnon,
  AlgolEffectSpawnInAnon,
  AlgolEffectStompAtAnon,
  AlgolEffectStompIdAnon,
  AlgolEffectMorphAtAnon,
  AlgolEffectMorphIdAnon,
  AlgolEffectMorphInAnon,
  AlgolEffectAdoptAtAnon,
  AlgolEffectAdoptIdAnon,
  AlgolEffectAdoptInAnon
} from "./effect.anon";

export function isAlgolEffectMoveAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectMoveAtAnon {
  return (expr as AlgolEffectMoveAtAnon).moveat !== undefined;
}

export function isAlgolEffectMoveId(
  expr: AlgolEffectAnon
): expr is AlgolEffectMoveIdAnon {
  return (expr as AlgolEffectMoveIdAnon).moveid !== undefined;
}

export function isAlgolEffectStompAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectStompAtAnon {
  return (expr as AlgolEffectStompAtAnon).stompat !== undefined;
}

export function isAlgolEffectStompId(
  expr: AlgolEffectAnon
): expr is AlgolEffectStompIdAnon {
  return (expr as AlgolEffectStompIdAnon).stompid !== undefined;
}

export function isAlgolEffectSetTurnPos(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetTurnPosAnon {
  return (expr as AlgolEffectSetTurnPosAnon).setturnpos !== undefined;
}

export function isAlgolEffectSetBattlePos(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetBattlePosAnon {
  return (expr as AlgolEffectSetBattlePosAnon).setbattlepos !== undefined;
}

export function isAlgolEffectSetTurnVar(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetTurnVarAnon {
  return (expr as AlgolEffectSetTurnVarAnon).setturnvar !== undefined;
}

export function isAlgolEffectSetBattleVar(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetBattleVarAnon {
  return (expr as AlgolEffectSetBattleVarAnon).setbattlevar !== undefined;
}

export function isAlgolEffectPushAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectPushAtAnon {
  return (expr as AlgolEffectPushAtAnon).pushat !== undefined;
}

export function isAlgolEffectPushIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectPushInAnon {
  return (expr as AlgolEffectPushInAnon).pushin !== undefined;
}

export function isAlgolEffectKillIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectKillInAnon {
  return (expr as AlgolEffectKillInAnon).killin !== undefined;
}

export function isAlgolEffectKillId(
  expr: AlgolEffectAnon
): expr is AlgolEffectKillIdAnon {
  return (expr as AlgolEffectKillIdAnon).killid !== undefined;
}
export function isAlgolEffectKillAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectKillAtAnon {
  return (expr as AlgolEffectKillAtAnon).killat !== undefined;
}

export function isAlgolEffectSetAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetAtAnon {
  return (expr as AlgolEffectSetAtAnon).setat !== undefined;
}

export function isAlgolEffectSetIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetInAnon {
  return (expr as AlgolEffectSetInAnon).setin !== undefined;
}

export function isAlgolEffectSetId(
  expr: AlgolEffectAnon
): expr is AlgolEffectSetIdAnon {
  return (expr as AlgolEffectSetIdAnon).setid !== undefined;
}

export function isAlgolEffectSpawnAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectSpawnAtAnon {
  return (expr as AlgolEffectSpawnAtAnon).spawnat !== undefined;
}

export function isAlgolEffectSpawnIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectSpawnInAnon {
  return (expr as AlgolEffectSpawnInAnon).spawnin !== undefined;
}

export function isAlgolEffectMorphAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectMorphAtAnon {
  return (expr as AlgolEffectMorphAtAnon).morphat !== undefined;
}

export function isAlgolEffectMorphId(
  expr: AlgolEffectAnon
): expr is AlgolEffectMorphIdAnon {
  return (expr as AlgolEffectMorphIdAnon).morphid !== undefined;
}

export function isAlgolEffectMorphIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectMorphInAnon {
  return (expr as AlgolEffectMorphInAnon).morphin !== undefined;
}

export function isAlgolEffectAdoptAt(
  expr: AlgolEffectAnon
): expr is AlgolEffectAdoptAtAnon {
  return (expr as AlgolEffectAdoptAtAnon).adoptat !== undefined;
}

export function isAlgolEffectAdoptId(
  expr: AlgolEffectAnon
): expr is AlgolEffectAdoptIdAnon {
  return (expr as AlgolEffectAdoptIdAnon).adoptid !== undefined;
}

export function isAlgolEffectAdoptIn(
  expr: AlgolEffectAnon
): expr is AlgolEffectAdoptInAnon {
  return (expr as AlgolEffectAdoptInAnon).adoptin !== undefined;
}
