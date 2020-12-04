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
  AlgolValValueAnon,
  AlgolValLoopReadAnon,
  AlgolValPosXAnon,
  AlgolValPosYAnon,
  AlgolValAddToAnon,
  AlgolValAddBitsToAnon,
  AlgolValHighestAnon,
  AlgolValLowestAnon,
  AlgolValBitAndAnon,
  AlgolValBitDiffAnon,
  AlgolValBitOrAnon,
  AlgolValCompareValsAnon,
  AlgolValCompareSetsAnon,
  AlgolValDistanceAnon,
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

export function isAlgolValLoopRead(
  expr: AlgolValAnon
): expr is AlgolValLoopReadAnon {
  return (expr as AlgolValLoopReadAnon).loopread !== undefined;
}

export function isAlgolValPosX(expr: AlgolValAnon): expr is AlgolValPosXAnon {
  return (expr as AlgolValPosXAnon).posx !== undefined;
}

export function isAlgolValPosY(expr: AlgolValAnon): expr is AlgolValPosYAnon {
  return (expr as AlgolValPosYAnon).posy !== undefined;
}

export function isAlgolValAddTo(expr: AlgolValAnon): expr is AlgolValAddToAnon {
  return (expr as AlgolValAddToAnon).addto !== undefined;
}

export function isAlgolValAddBitsTo(
  expr: AlgolValAnon
): expr is AlgolValAddBitsToAnon {
  return (expr as AlgolValAddBitsToAnon).addbitsto !== undefined;
}

export function isAlgolValHighest(
  expr: AlgolValAnon
): expr is AlgolValHighestAnon {
  return (expr as AlgolValHighestAnon).highest !== undefined;
}

export function isAlgolValLowest(
  expr: AlgolValAnon
): expr is AlgolValLowestAnon {
  return (expr as AlgolValLowestAnon).lowest !== undefined;
}

export function isAlgolValBitAnd(
  expr: AlgolValAnon
): expr is AlgolValBitAndAnon {
  return (expr as AlgolValBitAndAnon).bitand !== undefined;
}

export function isAlgolValBitDiff(
  expr: AlgolValAnon
): expr is AlgolValBitDiffAnon {
  return (expr as AlgolValBitDiffAnon).bitdiff !== undefined;
}

export function isAlgolValBitOr(expr: AlgolValAnon): expr is AlgolValBitOrAnon {
  return (expr as AlgolValBitOrAnon).bitor !== undefined;
}

export function isAlgolValCompareVals(
  expr: AlgolValAnon
): expr is AlgolValCompareValsAnon {
  return (expr as AlgolValCompareValsAnon).compareVals !== undefined;
}

export function isAlgolValCompareSets(
  expr: AlgolValAnon
): expr is AlgolValCompareSetsAnon {
  return (expr as AlgolValCompareSetsAnon).compareSets !== undefined;
}

export function isAlgolValDistance(
  expr: AlgolValAnon
): expr is AlgolValDistanceAnon {
  return (expr as AlgolValDistanceAnon).distance !== undefined;
}
