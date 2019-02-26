import { AlgolLogical } from "./";

import {
  AlgolLogicalIf,
  AlgolLogicalIfActionElse,
  AlgolLogicalIfElse,
  AlgolLogicalIfPlayer,
  AlgolLogicalIfAction,
  AlgolLogicalIndexList,
  AlgolLogicalPlayerCase,
  AlgolLogicalMulti
} from "./logical.interfaces";

export type AlgolLogicalAnon<_T> = AlgolLogical<
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

export type AlgolLogicalIfElseAnon<_T> = AlgolLogicalIfElse<
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

export type AlgolLogicalIfAnon<_T> = AlgolLogicalIf<
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

export type AlgolLogicalPlayerCaseAnon<_T> = AlgolLogicalPlayerCase<
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

export type AlgolLogicalIfPlayerAnon<_T> = AlgolLogicalIfPlayer<
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

export type AlgolLogicalIfActionAnon<_T> = AlgolLogicalIfAction<
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

export type AlgolLogicalIfActionElseAnon<_T> = AlgolLogicalIfActionElse<
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

export type AlgolLogicalIndexListAnon<_T> = AlgolLogicalIndexList<
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

export type AlgolLogicalMultiAnon<_T> = AlgolLogicalMulti<
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
