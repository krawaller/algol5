import { AlgolIfableExpression } from "./";

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

import {
  AlgolIfableExpressionIf,
  AlgolIfableExpressionIfAction,
  AlgolIfableExpressionIfPlayer,
} from "./ifableexpression.interfaces";

export type AlgolIfableExpressionIfAnon<_T> = AlgolIfableExpressionIf<
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

export type AlgolIfableExpressionIfPlayerAnon<
  _T
> = AlgolIfableExpressionIfPlayer<
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

export type AlgolIfableExpressionIfActionAnon<
  _T
> = AlgolIfableExpressionIfAction<
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
