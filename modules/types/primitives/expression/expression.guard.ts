import {
  AlgolExpressionIfActionElseAnon,
  AlgolExpressionIfElseAnon,
  AlgolExpressionPlayerCaseAnon,
  AlgolExpressionIndexListAnon,
} from "./expression.anon";

// ---- former logical guards

export function isAlgolExpressionIfElse<_T>(
  expr: any
): expr is AlgolExpressionIfElseAnon<_T> {
  return (expr as AlgolExpressionIfElseAnon<_T>).ifelse !== undefined;
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
