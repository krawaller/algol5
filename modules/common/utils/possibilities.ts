import {
  AlgolLogicalAnon,
  isAlgolLogicalIfActionElse,
  isAlgolLogicalPlayerCase,
  isAlgolLogicalIndexList,
  isAlgolLogicalIf,
  isAlgolLogicalIfElse
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
    const [test, whenTruthy, whenFalsy] = expr.ifelse;
    return possibilitiesInner(whenTruthy).concat(possibilitiesInner(whenFalsy));
  }

  if (isAlgolLogicalIfActionElse(expr)) {
    const [testAction, whenYes, whenNo] = expr.ifactionelse;
    return possibilitiesInner(whenYes).concat(possibilitiesInner(whenNo));
  }

  if (isAlgolLogicalPlayerCase(expr)) {
    const [plr1, plr2] = expr.playercase;
    return possibilitiesInner(plr1).concat(possibilitiesInner(plr2));
  }

  if (isAlgolLogicalIndexList(expr)) {
    const [idx, ...opts] = expr.indexlist;
    return opts.reduce((mem, o) => mem.concat(possibilitiesInner(o)), []);
  }

  if (isAlgolLogicalIf(expr)) {
    const [test, opt] = expr.if;
    return [].concat(possibilitiesInner(opt));
  }
  return [expr as _T];
}
