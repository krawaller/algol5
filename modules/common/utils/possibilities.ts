import {
  AlgolIfableExpressionAnon,
  isAlgolLogicalIfActionElse,
  isAlgolLogicalPlayerCase,
  isAlgolLogicalIndexList,
  isAlgolLogicalIf,
  isAlgolLogicalIfElse,
  isAlgolLogicalIfPlayer,
  isAlgolLogicalIfAction,
  AlgolStatementAnon,
  isAlgolStatementForIdIn,
  isAlgolStatementForPosIn,
  isAlgolStatementMulti
} from "algol-types";

export function possibilities<_T>(
  input: AlgolIfableExpressionAnon<_T> | AlgolStatementAnon<_T>,
  player: 0 | 1 | 2 = 0,
  action: string = "any"
): _T[] {
  const listWithDuplicates = possibilitiesInner(input, player, action);
  const possAsKeys = listWithDuplicates.reduce(
    (mem, poss) => ({ ...mem, [JSON.stringify(poss)]: 1 }),
    {}
  );
  return Object.keys(possAsKeys).map(i => JSON.parse(i));
}

function possibilitiesInner<_T>(
  input: AlgolIfableExpressionAnon<_T> | AlgolStatementAnon<_T>,
  player: 0 | 1 | 2,
  action: string
): _T[] {
  const expr = input as AlgolIfableExpressionAnon<_T>;
  if (isAlgolLogicalIfElse(expr)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy]
    } = expr;
    return possibilitiesInner(whenTruthy, player, action).concat(
      possibilitiesInner(whenFalsy, player, action)
    );
  }

  if (isAlgolLogicalIfActionElse(expr)) {
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

  if (isAlgolLogicalPlayerCase(expr)) {
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

  if (isAlgolLogicalIndexList(expr)) {
    const {
      indexlist: [idx, ...opts]
    } = expr;
    return opts.reduce(
      (mem, o) => mem.concat(possibilitiesInner(o, player, action)),
      []
    );
  }

  if (isAlgolLogicalIf(expr)) {
    const {
      if: [test, opt]
    } = expr;
    return [].concat(possibilitiesInner(opt, player, action));
  }

  if (isAlgolLogicalIfPlayer(expr)) {
    const {
      ifplayer: [plr, opt]
    } = expr;
    return player === plr
      ? [].concat(possibilitiesInner(opt, player, action))
      : [];
  }

  if (isAlgolLogicalIfAction(expr)) {
    const {
      ifaction: [testAction, opt]
    } = expr;
    return action === testAction || action === "any"
      ? [].concat(possibilitiesInner(opt, player, action))
      : [];
  }

  // statement possibilities

  const statement = input as AlgolStatementAnon<_T>;

  if (isAlgolStatementForIdIn(statement)) {
    const {
      foridin: [set, repeatStatement]
    } = statement;
    return possibilitiesInner(repeatStatement, player, action);
  }

  if (isAlgolStatementForPosIn(statement)) {
    const {
      forposin: [set, repeatStatement]
    } = statement;
    return possibilitiesInner(repeatStatement, player, action);
  }

  if (isAlgolStatementMulti(statement)) {
    const { multi: children } = statement;
    return children.reduce(
      (mem, child) => mem.concat(possibilitiesInner(child, player, action)),
      []
    );
  }

  return [input as _T];
}
