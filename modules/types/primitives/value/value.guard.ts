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
  return (expr as AlgolValValueAnon).value !== undefined;
}

export function isAlgolValRead(expr: AlgolValAnon): expr is AlgolValReadAnon {
  return (expr as AlgolValReadAnon).read !== undefined;
}

export function isAlgolValBattleVar(
  expr: AlgolValAnon
): expr is AlgolValBattleVarAnon {
  return (expr as AlgolValBattleVarAnon).battlevar !== undefined;
}

export function isAlgolValTurnVar(
  expr: AlgolValAnon
): expr is AlgolValTurnVarAnon {
  return (expr as AlgolValTurnVarAnon).turnvar !== undefined;
}

export function isAlgolValIdAt(expr: AlgolValAnon): expr is AlgolValIdAtAnon {
  return (expr as AlgolValIdAtAnon).idat !== undefined;
}

export function isAlgolValPos(expr: AlgolValAnon): expr is AlgolValPosAnon {
  return (expr as AlgolValPosAnon).pos !== undefined;
}

export function isAlgolValRelDir(
  expr: AlgolValAnon
): expr is AlgolValRelDirAnon {
  return (expr as AlgolValRelDirAnon).reldir !== undefined;
}

export function isAlgolValGridAt(
  expr: AlgolValAnon
): expr is AlgolValGridAtAnon {
  return (expr as AlgolValGridAtAnon).gridat !== undefined;
}

export function isAlgolValGridIn(
  expr: AlgolValAnon
): expr is AlgolValGridInAnon {
  return (expr as AlgolValGridInAnon).gridin !== undefined;
}

export function isAlgolValSizeOf(
  expr: AlgolValAnon
): expr is AlgolValSizeOfAnon {
  return (expr as AlgolValSizeOfAnon).sizeof !== undefined;
}

export function isAlgolValHarvest(
  expr: AlgolValAnon
): expr is AlgolValHarvestAnon {
  return (expr as AlgolValHarvestAnon).harvest !== undefined;
}

export function isAlgolValSum(expr: AlgolValAnon): expr is AlgolValSumAnon {
  return (expr as AlgolValSumAnon).sum !== undefined;
}

export function isAlgolValProd(expr: AlgolValAnon): expr is AlgolValProdAnon {
  return (expr as AlgolValProdAnon).prod !== undefined;
}

export function isAlgolValMinus(expr: AlgolValAnon): expr is AlgolValMinusAnon {
  return (expr as AlgolValMinusAnon).minus !== undefined;
}
