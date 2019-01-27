import {
  AlgolValAnon,
  AlgolValBattleVarAnon,
  AlgolValGridAtAnon,
  AlgolValGridInAnon,
  AlgolValHarvestAnon,
  AlgolValIdAtAnon,
  AlgolValMinusAnon,
  AlgolValPosAnon,
  AlgolValProdAnon,
  AlgolValReadAnon,
  AlgolValRelDirAnon,
  AlgolValSizeOfAnon,
  AlgolValSumAnon,
  AlgolValTurnVarAnon,
  AlgolValValueAnon
} from "./value.anon";

export function isAlgolValValue(expr: AlgolValAnon): expr is AlgolValValueAnon {
  return !!(expr as AlgolValValueAnon).value;
}

export function isAlgolValRead(expr: AlgolValAnon): expr is AlgolValReadAnon {
  return !!(expr as AlgolValReadAnon).read;
}

export function isAlgolValBattleVar(
  expr: AlgolValAnon
): expr is AlgolValBattleVarAnon {
  return !!(expr as AlgolValBattleVarAnon).battlevar;
}

export function isAlgolValTurnVar(
  expr: AlgolValAnon
): expr is AlgolValTurnVarAnon {
  return !!(expr as AlgolValTurnVarAnon).turnvar;
}

export function isAlgolValIdAt(expr: AlgolValAnon): expr is AlgolValIdAtAnon {
  return !!(expr as AlgolValIdAtAnon).idat;
}

export function isAlgolValPos(expr: AlgolValAnon): expr is AlgolValPosAnon {
  return !!(expr as AlgolValPosAnon).pos;
}

export function isAlgolValRelDir(
  expr: AlgolValAnon
): expr is AlgolValRelDirAnon {
  return !!(expr as AlgolValRelDirAnon).reldir;
}

export function isAlgolValGridAt(
  expr: AlgolValAnon
): expr is AlgolValGridAtAnon {
  return !!(expr as AlgolValGridAtAnon).gridat;
}

export function isAlgolValGridIn(
  expr: AlgolValAnon
): expr is AlgolValGridInAnon {
  return !!(expr as AlgolValGridInAnon).gridin;
}

export function isAlgolValSizeOf(
  expr: AlgolValAnon
): expr is AlgolValSizeOfAnon {
  return !!(expr as AlgolValSizeOfAnon).sizeof;
}

export function isAlgolValHarvest(
  expr: AlgolValAnon
): expr is AlgolValHarvestAnon {
  return !!(expr as AlgolValHarvestAnon).harvest;
}

export function isAlgolValSum(expr: AlgolValAnon): expr is AlgolValSumAnon {
  return !!(expr as AlgolValSumAnon).sum;
}

export function isAlgolValProd(expr: AlgolValAnon): expr is AlgolValProdAnon {
  return !!(expr as AlgolValProdAnon).prod;
}

export function isAlgolValMinus(expr: AlgolValAnon): expr is AlgolValMinusAnon {
  return !!(expr as AlgolValMinusAnon).minus;
}
