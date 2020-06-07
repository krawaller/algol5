import {
  AlgolPosAnon,
  AlgolPosBattlePosAnon,
  AlgolPosMarkAnon,
  AlgolPosOnlyInAnon,
  AlgolPosTurnPosAnon,
  AlgolPosOffsetAnon,
  AlgolPosFromXYAnon,
} from "./pos.anon";

export function isAlgolPosMark(expr: AlgolPosAnon): expr is AlgolPosMarkAnon {
  return (expr as AlgolPosMarkAnon).mark !== undefined;
}

export function isAlgolPosOnlyIn(
  expr: AlgolPosAnon
): expr is AlgolPosOnlyInAnon {
  return (expr as AlgolPosOnlyInAnon).onlyin !== undefined;
}

export function isAlgolPosBattlePos(
  expr: AlgolPosAnon
): expr is AlgolPosBattlePosAnon {
  return (expr as AlgolPosBattlePosAnon).battlepos !== undefined;
}

export function isAlgolPosTurnPos(
  expr: AlgolPosAnon
): expr is AlgolPosTurnPosAnon {
  return (expr as AlgolPosTurnPosAnon).turnpos !== undefined;
}

export function isAlgolPosOffset(
  expr: AlgolPosAnon
): expr is AlgolPosOffsetAnon {
  return (expr as AlgolPosOffsetAnon).offset !== undefined;
}

export function isAlgolPosFromXY(
  expr: AlgolPosAnon
): expr is AlgolPosFromXYAnon {
  return (expr as AlgolPosFromXYAnon).fromxy !== undefined;
}
