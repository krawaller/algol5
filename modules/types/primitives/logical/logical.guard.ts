import {
  AlgolLogicalAnon,
  AlgolLogicalIfActionElseAnon,
  AlgolLogicalIfAnon,
  AlgolLogicalIfElseAnon,
  AlgolLogicalIfPlayerAnon,
  AlgolLogicalIndexListAnon,
  AlgolLogicalPlayerCaseAnon
} from "./logical.anon";

export function isAlgolLogicalIfElse<_T>(
  expr: AlgolLogicalAnon<_T>
): expr is AlgolLogicalIfElseAnon<_T> {
  return (expr as AlgolLogicalIfElseAnon<_T>).ifelse !== undefined;
}

export function isAlgolLogicalIf<_T>(
  expr: AlgolLogicalAnon<_T>
): expr is AlgolLogicalIfAnon<_T> {
  return (expr as AlgolLogicalIfAnon<_T>).if !== undefined;
}

export function isAlgolLogicalIfPlayer<_T>(
  expr: AlgolLogicalAnon<_T>
): expr is AlgolLogicalIfPlayerAnon<_T> {
  return (expr as AlgolLogicalIfPlayerAnon<_T>).ifplayer !== undefined;
}

export function isAlgolLogicalPlayerCase<_T>(
  expr: AlgolLogicalAnon<_T>
): expr is AlgolLogicalPlayerCaseAnon<_T> {
  return (expr as AlgolLogicalPlayerCaseAnon<_T>).playercase !== undefined;
}

export function isAlgolLogicalIfActionElse<_T>(
  expr: AlgolLogicalAnon<_T>
): expr is AlgolLogicalIfActionElseAnon<_T> {
  return (expr as AlgolLogicalIfActionElseAnon<_T>).ifactionelse !== undefined;
}

export function isAlgolLogicalIndexList<_T>(
  expr: AlgolLogicalAnon<_T>
): expr is AlgolLogicalIndexListAnon<_T> {
  return (expr as AlgolLogicalIndexListAnon<_T>).indexlist !== undefined;
}
