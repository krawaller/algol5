import { AlgolStatement } from "./";
import {
  AlgolStatementForIdIn,
  AlgolStatementForPosIn,
  AlgolStatementMulti,
  AlgolStatementIf,
  AlgolStatementIfAction,
  AlgolStatementIfActionElse,
  AlgolStatementIfElse,
  AlgolStatementIfPlayer,
  AlgolStatementPlayerCase
} from "./statement.interfaces";

type s = string;

export type AlgolStatementAnon<_T> = AlgolStatement<_T, s, s, s, s, s, s, s, s>;
export type AlgolStatementMultiAnon<_T> = AlgolStatementMulti<
  _T,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;
export type AlgolStatementForIdInAnon<_T> = AlgolStatementForIdIn<
  _T,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;
export type AlgolStatementForPosInAnon<_T> = AlgolStatementForPosIn<
  _T,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;

export type AlgolStatementIfElseAnon<_T> = AlgolStatementIfElse<
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

export type AlgolStatementIfAnon<_T> = AlgolStatementIf<
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

export type AlgolStatementPlayerCaseAnon<_T> = AlgolStatementPlayerCase<
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

export type AlgolStatementIfPlayerAnon<_T> = AlgolStatementIfPlayer<
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

export type AlgolStatementIfActionAnon<_T> = AlgolStatementIfAction<
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

export type AlgolStatementIfActionElseAnon<_T> = AlgolStatementIfActionElse<
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
