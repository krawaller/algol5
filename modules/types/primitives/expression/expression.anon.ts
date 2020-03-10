import { AlgolExpression } from "./";

export type AlgolExpressionAnon<_T> = AlgolExpression<AlgolGameBlobAnon, _T>;

// ------- former logical

import {
  AlgolExpressionIfActionElse,
  AlgolExpressionIfElse,
  AlgolExpressionIndexList,
  AlgolExpressionPlayerCase,
  AlgolExpressionIfRulesetElse,
} from "./expression.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolExpressionIfElseAnon<_T> = AlgolExpressionIfElse<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolExpressionPlayerCaseAnon<_T> = AlgolExpressionPlayerCase<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolExpressionIfActionElseAnon<_T> = AlgolExpressionIfActionElse<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolExpressionIfRulesetElseAnon<_T> = AlgolExpressionIfRulesetElse<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolExpressionIndexListAnon<_T> = AlgolExpressionIndexList<
  AlgolGameBlobAnon,
  _T
>;
