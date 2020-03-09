import {
  AlgolIfableExpressionAnon,
  isAlgolExpressionIfActionElse,
  isAlgolExpressionPlayerCase,
  isAlgolExpressionIndexList,
  isAlgolIfableExpressionIf,
  isAlgolExpressionIfElse,
  isAlgolIfableExpressionIfPlayer,
  isAlgolIfableExpressionIfAction,
  isAlgolIfableExpressionIfRuleset,
  AlgolStatementAnon,
  isAlgolStatementForIdIn,
  isAlgolStatementForPosIn,
  isAlgolStatementMulti,
  isAlgolExpressionIfRulesetElse,
} from "../../types";

export function possibilities<_T>(
  input: AlgolIfableExpressionAnon<_T> | AlgolStatementAnon<_T>,
  player: 0 | 1 | 2 = 0,
  action: string = "any",
  ruleset: string = "basic"
): _T[] {
  const listWithDuplicates = possibilitiesInner(input, player, action, ruleset);
  const possAsKeys = listWithDuplicates.reduce(
    (mem, poss) => ({ ...mem, [JSON.stringify(poss)]: 1 }),
    {}
  );
  return Object.keys(possAsKeys).map(i => JSON.parse(i));
}

function possibilitiesInner<_T>(
  input: AlgolIfableExpressionAnon<_T> | AlgolStatementAnon<_T>,
  player: 0 | 1 | 2,
  action: string,
  ruleset: string
): _T[] {
  const expr = input as AlgolIfableExpressionAnon<_T>;
  if (isAlgolExpressionIfElse(expr)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy],
    } = expr;
    return possibilitiesInner(whenTruthy, player, action, ruleset).concat(
      possibilitiesInner(whenFalsy, player, action, ruleset)
    );
  }

  if (isAlgolExpressionIfActionElse(expr)) {
    const {
      ifactionelse: [testAction, whenYes, whenNo],
    } = expr;
    let poss: any[] = [];
    if (action === "any" || action === testAction)
      poss = poss.concat(possibilitiesInner(whenYes, player, action, ruleset));
    if (action === "any" || action !== testAction)
      poss = poss.concat(possibilitiesInner(whenNo, player, action, ruleset));
    return poss;
  }

  if (isAlgolExpressionIfRulesetElse(expr)) {
    const {
      ifrulesetelse: [testRuleset, whenYes, whenNo],
    } = expr;
    let poss: any[] = [];
    if (ruleset === "any" || ruleset === testRuleset)
      poss = poss.concat(possibilitiesInner(whenYes, player, action, ruleset));
    if (ruleset === "any" || ruleset !== testRuleset)
      poss = poss.concat(possibilitiesInner(whenNo, player, action, ruleset));
    return poss;
  }

  if (isAlgolExpressionPlayerCase(expr)) {
    const {
      playercase: [plr1, plr2],
    } = expr;
    let poss: any[] = [];
    if (player !== 2)
      poss = poss.concat(possibilitiesInner(plr1, player, action, ruleset));
    if (player !== 1)
      poss = poss.concat(possibilitiesInner(plr2, player, action, ruleset));
    return poss;
  }

  if (isAlgolExpressionIndexList(expr)) {
    const {
      indexlist: [idx, ...opts],
    } = expr;
    return opts.reduce(
      (mem, o) => mem.concat(possibilitiesInner(o, player, action, ruleset)),
      [] as any[]
    );
  }

  if (isAlgolIfableExpressionIf(expr)) {
    const {
      if: [test, opt],
    } = expr;
    return ([] as any[]).concat(
      possibilitiesInner(opt, player, action, ruleset)
    );
  }

  if (isAlgolIfableExpressionIfPlayer(expr)) {
    const {
      ifplayer: [plr, opt],
    } = expr;
    return player === plr
      ? ([] as any[]).concat(possibilitiesInner(opt, player, action, ruleset))
      : [];
  }

  if (isAlgolIfableExpressionIfAction(expr)) {
    const {
      ifaction: [testAction, opt],
    } = expr;
    return action === testAction || action === "any"
      ? ([] as any[]).concat(possibilitiesInner(opt, player, action, ruleset))
      : [];
  }

  if (isAlgolIfableExpressionIfRuleset(expr)) {
    const {
      ifruleset: [testRuleset, opt],
    } = expr;
    return ruleset === testRuleset || ruleset === "any"
      ? ([] as any[]).concat(possibilitiesInner(opt, player, action, ruleset))
      : [];
  }

  // statement possibilities

  const statement = input as AlgolStatementAnon<_T>;

  if (isAlgolStatementForIdIn(statement)) {
    const {
      foridin: [set, repeatStatement],
    } = statement;
    return possibilitiesInner(repeatStatement, player, action, ruleset);
  }

  if (isAlgolStatementForPosIn(statement)) {
    const {
      forposin: [set, repeatStatement],
    } = statement;
    return possibilitiesInner(repeatStatement, player, action, ruleset);
  }

  if (isAlgolStatementMulti(statement)) {
    const { multi: children } = statement;
    return children.reduce(
      (mem, child) =>
        mem.concat(possibilitiesInner(child, player, action, ruleset)),
      [] as any[]
    );
  }

  return [input as _T];
}
