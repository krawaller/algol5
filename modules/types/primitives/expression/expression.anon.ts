import { AlgolExpression } from "./";

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

// ------- former logical

import {
  AlgolExpressionIfActionElse,
  AlgolExpressionIfElse,
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
