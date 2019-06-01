import { AlgolExpression, AlgolIfableExpression } from "./";

export type AlgolExpressionAnon<_T> = AlgolExpression<
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
export type AlgolIfableExpressionAnon<_T> = AlgolIfableExpression<
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

// ------- former logical

import {
  AlgolExpressionIf,
  AlgolExpressionIfActionElse,
  AlgolExpressionIfElse,
  AlgolExpressionIfPlayer,
  AlgolExpressionIfAction,
  AlgolExpressionIndexList,
  AlgolExpressionPlayerCase,
} from "./expression.interfaces";

export type AlgolExpressionIfElseAnon<_T> = AlgolExpressionIfElse<
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

export type AlgolExpressionIfAnon<_T> = AlgolExpressionIf<
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

export type AlgolExpressionPlayerCaseAnon<_T> = AlgolExpressionPlayerCase<
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

export type AlgolExpressionIfPlayerAnon<_T> = AlgolExpressionIfPlayer<
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

export type AlgolExpressionIfActionAnon<_T> = AlgolExpressionIfAction<
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

export type AlgolExpressionIfActionElseAnon<_T> = AlgolExpressionIfActionElse<
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

export type AlgolExpressionIndexListAnon<_T> = AlgolExpressionIndexList<
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
