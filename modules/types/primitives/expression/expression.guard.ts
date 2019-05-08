import {
  AlgolExpressionAnon,
  AlgolIfableExpressionAnon
} from "./expression.anon";

// ---- logical guards

import {
  AlgolLogicalIfActionElseAnon,
  AlgolLogicalIfAnon,
  AlgolLogicalIfElseAnon,
  AlgolLogicalIfPlayerAnon,
  AlgolLogicalIfActionAnon,
  AlgolLogicalPlayerCaseAnon
} from "../";

export function isAlgolExpressionIfElse<_T>(
  expr: AlgolExpressionAnon<_T>
): expr is AlgolLogicalIfElseAnon<_T> {
  return (expr as AlgolLogicalIfElseAnon<_T>).ifelse !== undefined;
}

export function isAlgolIfableExpressionIf<_T>(
  expr: AlgolIfableExpressionAnon<_T>
): expr is AlgolLogicalIfAnon<_T> {
  return (expr as AlgolLogicalIfAnon<_T>).if !== undefined;
}

export function isAlgolIfableExpressionIfPlayer<_T>(
  expr: AlgolIfableExpressionAnon<_T>
): expr is AlgolLogicalIfPlayerAnon<_T> {
  return (expr as AlgolLogicalIfPlayerAnon<_T>).ifplayer !== undefined;
}

export function isAlgolIfableExpressionIfAction<_T>(
  expr: AlgolIfableExpressionAnon<_T>
): expr is AlgolLogicalIfActionAnon<_T> {
  return (expr as AlgolLogicalIfActionAnon<_T>).ifaction !== undefined;
}

export function isAlgolExpressionPlayerCase<_T>(
  expr: AlgolExpressionAnon<_T>
): expr is AlgolLogicalPlayerCaseAnon<_T> {
  return (expr as AlgolLogicalPlayerCaseAnon<_T>).playercase !== undefined;
}

export function isAlgolExpressionIfActionElse<_T>(
  expr: AlgolExpressionAnon<_T>
): expr is AlgolLogicalIfActionElseAnon<_T> {
  return (expr as AlgolLogicalIfActionElseAnon<_T>).ifactionelse !== undefined;
}
