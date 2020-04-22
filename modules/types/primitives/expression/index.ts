export * from "./expression.anon";
export * from "./expression.guard";
export * from "./expression.interfaces";

import {
  AlgolExpressionIfActionElse,
  AlgolExpressionIfElse,
  AlgolExpressionIndexList,
  AlgolExpressionPlayerCase,
  AlgolExpressionIfRulesetElse,
  AlgolExpressionFirstTruthy,
} from "./expression.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolExpression<Blob extends AlgolGameBlobAnon, _T> =
  | _T
  | AlgolExpressionIfElse<Blob, _T>
  | AlgolExpressionPlayerCase<Blob, _T>
  | AlgolExpressionIfActionElse<Blob, _T>
  | AlgolExpressionIndexList<Blob, _T>
  | AlgolExpressionIfRulesetElse<Blob, _T>
  | AlgolExpressionFirstTruthy<Blob, _T>;
