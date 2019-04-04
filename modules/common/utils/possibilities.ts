import {
  AlgolLogicalAnon,
  isAlgolLogicalIfActionElse,
  isAlgolLogicalPlayerCase,
  isAlgolLogicalIndexList,
  isAlgolLogicalIf,
  isAlgolLogicalIfElse,
  isAlgolLogicalIfPlayer
} from "../../types";

export function possibilities<_T>(expr: AlgolLogicalAnon<_T>): _T[] {
  const listWithDuplicates = possibilitiesInner(expr);
  const possAsKeys = listWithDuplicates.reduce(
    (mem, poss) => ({ ...mem, [JSON.stringify(poss)]: 1 }),
    {}
  );
  return Object.keys(possAsKeys).map(i => JSON.parse(i));
}

function possibilitiesInner<_T>(expr: AlgolLogicalAnon<_T>): _T[] {
  if (isAlgolLogicalIfElse(expr)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy]
    } = expr;
    return possibilitiesInner(whenTruthy).concat(possibilitiesInner(whenFalsy));
  }

  if (isAlgolLogicalIfActionElse(expr)) {
    const {
      ifactionelse: [testAction, whenYes, whenNo]
    } = expr;
    return possibilitiesInner(whenYes).concat(possibilitiesInner(whenNo));
  }

  if (isAlgolLogicalPlayerCase(expr)) {
    const {
      playercase: [plr1, plr2]
    } = expr;
    return possibilitiesInner(plr1).concat(possibilitiesInner(plr2));
  }

  if (isAlgolLogicalIndexList(expr)) {
    const {
      indexlist: [idx, ...opts]
    } = expr;
    return opts.reduce((mem, o) => mem.concat(possibilitiesInner(o)), []);
  }

  if (isAlgolLogicalIf(expr)) {
    const {
      if: [test, opt]
    } = expr;
    return [].concat(possibilitiesInner(opt));
  }

  if (isAlgolLogicalIfPlayer(expr)) {
    const {
      ifplayer: [plr, opt]
    } = expr;
    return [].concat(possibilitiesInner(opt));
  }
  return [expr as _T];
}
