import {
  AlgolExpressionAnon,
  AlgolIfableExpressionAnon,
  AlgolExpressionIfActionElseAnon,
  AlgolExpressionIfAnon,
  AlgolExpressionIfElseAnon,
  AlgolExpressionIfPlayerAnon,
  AlgolExpressionIfActionAnon,
  AlgolExpressionPlayerCaseAnon,
  AlgolExpressionIndexListAnon,
} from "./expression.anon";

// ---- former logical guards

export function isAlgolExpressionIfElse<_T>(
  expr: any
): expr is AlgolExpressionIfElseAnon<_T> {
  return (expr as AlgolExpressionIfElseAnon<_T>).ifelse !== undefined;
}

export function isAlgolIfableExpressionIf<_T>(
  expr: any
): expr is AlgolExpressionIfAnon<_T> {
  return (expr as AlgolExpressionIfAnon<_T>).if !== undefined;
}

export function isAlgolIfableExpressionIfPlayer<_T>(
  expr: any
): expr is AlgolExpressionIfPlayerAnon<_T> {
  return (expr as AlgolExpressionIfPlayerAnon<_T>).ifplayer !== undefined;
}

export function isAlgolIfableExpressionIfAction<_T>(
  expr: any
): expr is AlgolExpressionIfActionAnon<_T> {
  return (expr as AlgolExpressionIfActionAnon<_T>).ifaction !== undefined;
}

export function isAlgolExpressionPlayerCase<_T>(
  expr: any
): expr is AlgolExpressionPlayerCaseAnon<_T> {
  return (expr as AlgolExpressionPlayerCaseAnon<_T>).playercase !== undefined;
}

export function isAlgolExpressionIfActionElse<_T>(
  expr: any
): expr is AlgolExpressionIfActionElseAnon<_T> {
  return (
    (expr as AlgolExpressionIfActionElseAnon<_T>).ifactionelse !== undefined
  );
}

export function isAlgolExpressionIndexList<_T>(
  expr: any
): expr is AlgolExpressionIndexListAnon<_T> {
  return (expr as AlgolExpressionIndexListAnon<_T>).indexlist !== undefined;
}
