import { AlgolIfableExpression } from "./";

export type AlgolIfableExpressionAnon<_T> = AlgolIfableExpression<
  AlgolGameBlobAnon,
  _T
>;

import {
  AlgolIfableExpressionIf,
  AlgolIfableExpressionIfAction,
  AlgolIfableExpressionIfPlayer,
} from "./ifableexpression.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolIfableExpressionIfAnon<_T> = AlgolIfableExpressionIf<
  AlgolGameBlobAnon,
  _T
>;

export type AlgolIfableExpressionIfPlayerAnon<
  _T
> = AlgolIfableExpressionIfPlayer<AlgolGameBlobAnon, _T>;

export type AlgolIfableExpressionIfActionAnon<
  _T
> = AlgolIfableExpressionIfAction<AlgolGameBlobAnon, _T>;
