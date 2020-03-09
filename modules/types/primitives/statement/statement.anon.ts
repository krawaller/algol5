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
  AlgolStatementIfRuleset,
  AlgolStatementPlayerCase,
  AlgolStatementIfRulesetElse,
} from "./statement.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

type s = string;

export type AlgolStatementAnon<_T> = AlgolStatement<AlgolGameBlobAnon, _T>;
export type AlgolStatementMultiAnon<_T> = AlgolStatementMulti<
  AlgolGameBlobAnon,
  _T
>;
export type AlgolStatementForIdInAnon<_T> = AlgolStatementForIdIn<
  AlgolGameBlobAnon,
  _T
>;
export type AlgolStatementForPosInAnon<_T> = AlgolStatementForPosIn<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolStatementIfElseAnon<_T> = AlgolStatementIfElse<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolStatementIfAnon<_T> = AlgolStatementIf<AlgolGameBlobAnon, _T>;

export type AlgolStatementPlayerCaseAnon<_T> = AlgolStatementPlayerCase<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolStatementIfPlayerAnon<_T> = AlgolStatementIfPlayer<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolStatementIfActionAnon<_T> = AlgolStatementIfAction<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolStatementIfRulesetAnon<_T> = AlgolStatementIfRuleset<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolStatementIfActionElseAnon<_T> = AlgolStatementIfActionElse<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolStatementIfRulesetElseAnon<_T> = AlgolStatementIfRulesetElse<
  AlgolGameBlobAnon,
  _T
>;
