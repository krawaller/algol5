import {
  AlgolIfableExpressionIfActionElse,
  AlgolIfableExpressionIfElse,
  AlgolIfableExpressionIndexList,
  AlgolIfableExpressionPlayerCase,
  AlgolIfableExpressionIf,
  AlgolIfableExpressionIfPlayer,
  AlgolIfableExpressionIfAction,
  AlgolIfableExpressionIfRuleset,
  AlgolIfableExpressionIfRulesetElse,
} from "./ifableexpression.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export * from "./ifableexpression.interfaces";
export * from "./ifableexpression.guard";
export * from "./ifableexpression.anon";

export type AlgolIfableExpression<Blob extends AlgolGameBlobAnon, _T> =
  | _T
  | AlgolIfableExpressionIf<Blob, _T>
  | AlgolIfableExpressionIfAction<Blob, _T>
  | AlgolIfableExpressionIfPlayer<Blob, _T>
  | AlgolIfableExpressionIfActionElse<Blob, _T>
  | AlgolIfableExpressionIfElse<Blob, _T>
  | AlgolIfableExpressionIndexList<Blob, _T>
  | AlgolIfableExpressionPlayerCase<Blob, _T>
  | AlgolIfableExpressionIfRuleset<Blob, _T>
  | AlgolIfableExpressionIfRulesetElse<Blob, _T>;
