import {
  AlgolStatementAnon,
  AlgolStatementForIdInAnon,
  AlgolStatementForPosInAnon,
  AlgolStatementMultiAnon,
  AlgolStatementIfActionAnon,
  AlgolStatementIfActionElseAnon,
  AlgolStatementIfAnon,
  AlgolStatementIfElseAnon,
  AlgolStatementIfPlayerAnon,
  AlgolStatementPlayerCaseAnon
} from "./statement.anon";

export function isAlgolStatementForIdIn<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementForIdInAnon<_T> {
  return (expr as AlgolStatementForIdInAnon<_T>).foridin !== undefined;
}

export function isAlgolStatementForPosIn<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementForPosInAnon<_T> {
  return (expr as AlgolStatementForPosInAnon<_T>).forposin !== undefined;
}

export function isAlgolStatementMulti<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementMultiAnon<_T> {
  return (expr as AlgolStatementMultiAnon<_T>).multi !== undefined;
}

// ---- former logical guards

export function isAlgolStatementIfElse<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementIfElseAnon<_T> {
  return (expr as AlgolStatementIfElseAnon<_T>).ifelse !== undefined;
}

export function isAlgolStatementIf<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementIfAnon<_T> {
  return (expr as AlgolStatementIfAnon<_T>).if !== undefined;
}

export function isAlgolStatementIfPlayer<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementIfPlayerAnon<_T> {
  return (expr as AlgolStatementIfPlayerAnon<_T>).ifplayer !== undefined;
}

export function isAlgolStatementIfAction<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementIfActionAnon<_T> {
  return (expr as AlgolStatementIfActionAnon<_T>).ifaction !== undefined;
}

export function isAlgolStatementPlayerCase<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementPlayerCaseAnon<_T> {
  return (expr as AlgolStatementPlayerCaseAnon<_T>).playercase !== undefined;
}

export function isAlgolStatementIfActionElse<_T>(
  expr: AlgolStatementAnon<_T>
): expr is AlgolStatementIfActionElseAnon<_T> {
  return (
    (expr as AlgolStatementIfActionElseAnon<_T>).ifactionelse !== undefined
  );
}
