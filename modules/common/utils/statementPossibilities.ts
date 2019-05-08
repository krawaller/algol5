import {
  AlgolStatementAnon,
  isAlgolStatementIfActionElse,
  isAlgolStatementPlayerCase,
  isAlgolStatementIf,
  isAlgolStatementIfElse,
  isAlgolStatementIfPlayer,
  isAlgolStatementIfAction
} from "../../types";

export function statementPossibilities<_T>(
  expr: AlgolStatementAnon<_T>,
  player: 0 | 1 | 2 = 0,
  action: string = "any"
): _T[] {
  const listWithDuplicates = possibilitiesInner(expr, player, action);
  const possAsKeys = listWithDuplicates.reduce(
    (mem, poss) => ({ ...mem, [JSON.stringify(poss)]: 1 }),
    {}
  );
  return Object.keys(possAsKeys).map(i => JSON.parse(i));
}

function possibilitiesInner<_T>(
  expr: AlgolStatementAnon<_T>,
  player: 0 | 1 | 2,
  action: string
): _T[] {
  if (isAlgolStatementIfElse(expr)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy]
    } = expr;
    return possibilitiesInner(whenTruthy, player, action).concat(
      possibilitiesInner(whenFalsy, player, action)
    );
  }

  if (isAlgolStatementIfActionElse(expr)) {
    const {
      ifactionelse: [testAction, whenYes, whenNo]
    } = expr;
    let poss = [];
    if (action === "any" || action === testAction)
      poss = poss.concat(possibilitiesInner(whenYes, player, action));
    if (action === "any" || action !== testAction)
      poss = poss.concat(possibilitiesInner(whenNo, player, action));
    return poss;
  }

  if (isAlgolStatementPlayerCase(expr)) {
    const {
      playercase: [plr1, plr2]
    } = expr;
    let poss = [];
    if (player !== 2)
      poss = poss.concat(possibilitiesInner(plr1, player, action));
    if (player !== 1)
      poss = poss.concat(possibilitiesInner(plr2, player, action));
    return poss;
  }

  if (isAlgolStatementIf(expr)) {
    const {
      if: [test, opt]
    } = expr;
    return [].concat(possibilitiesInner(opt, player, action));
  }

  if (isAlgolStatementIfPlayer(expr)) {
    const {
      ifplayer: [plr, opt]
    } = expr;
    return player === plr
      ? [].concat(possibilitiesInner(opt, player, action))
      : [];
  }

  if (isAlgolStatementIfAction(expr)) {
    const {
      ifaction: [testAction, opt]
    } = expr;
    return action === testAction || action === "any"
      ? [].concat(possibilitiesInner(opt, player, action))
      : [];
  }

  return [expr as _T];
}
