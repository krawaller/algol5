import {
  AlgolLogicalAnon,
  AlgolLogicalIfElseAnon,
  AlgolLogicalIfActionElseAnon,
  AlgolLogicalPlayerCaseAnon,
  AlgolLogicalIndexListAnon,
  AlgolLogicalIfAnon
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
  if ((expr as AlgolLogicalIfElseAnon<_T>).ifelse) {
    const [test, whenTruthy, whenFalsy] = (expr as AlgolLogicalIfElseAnon<
      _T
    >).ifelse;
    return possibilitiesInner(whenTruthy).concat(possibilitiesInner(whenFalsy));
  }

  if ((expr as AlgolLogicalIfActionElseAnon<_T>).ifactionelse) {
    const [testAction, whenYes, whenNo] = (expr as AlgolLogicalIfActionElseAnon<
      _T
    >).ifactionelse;
    return possibilitiesInner(whenYes).concat(possibilitiesInner(whenNo));
  }

  if ((expr as AlgolLogicalPlayerCaseAnon<_T>).playercase) {
    const [plr1, plr2] = (expr as AlgolLogicalPlayerCaseAnon<_T>).playercase;
    return possibilitiesInner(plr1).concat(possibilitiesInner(plr2));
  }

  if ((expr as AlgolLogicalIndexListAnon<_T>).indexlist) {
    const [idx, ...opts] = (expr as AlgolLogicalIndexListAnon<_T>).indexlist;
    return opts.reduce((mem, o) => mem.concat(possibilitiesInner(o)), []);
  }

  if ((expr as AlgolLogicalIfAnon<_T>).if) {
    const [test, opt] = (expr as AlgolLogicalIfAnon<_T>).if;
    return [].concat(possibilitiesInner(opt));
  }
  return [expr as _T];
}
