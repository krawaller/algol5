import {
  AlgolIfableExpressionIfActionAnon,
  AlgolIfableExpressionIfAnon,
  AlgolIfableExpressionIfPlayerAnon,
  AlgolIfableExpressionIfRulesetAnon,
} from "./ifableexpression.anon";

export function isAlgolIfableExpressionIf<_T>(
  expr: any
): expr is AlgolIfableExpressionIfAnon<_T> {
  return (expr as AlgolIfableExpressionIfAnon<_T>).if !== undefined;
}

export function isAlgolIfableExpressionIfPlayer<_T>(
  expr: any
): expr is AlgolIfableExpressionIfPlayerAnon<_T> {
  return (expr as AlgolIfableExpressionIfPlayerAnon<_T>).ifplayer !== undefined;
}

export function isAlgolIfableExpressionIfAction<_T>(
  expr: any
): expr is AlgolIfableExpressionIfActionAnon<_T> {
  return (expr as AlgolIfableExpressionIfActionAnon<_T>).ifaction !== undefined;
}

export function isAlgolIfableExpressionIfRuleset<_T>(
  expr: any
): expr is AlgolIfableExpressionIfRulesetAnon<_T> {
  return (
    (expr as AlgolIfableExpressionIfRulesetAnon<_T>).ifruleset !== undefined
  );
}
