import { AlgolVal } from "./";

import {
  AlgolValBattleVar,
  AlgolValGridAt,
  AlgolValGridIn,
  AlgolValHarvest,
  AlgolValIdAt,
  AlgolValMinus,
  AlgolValPos,
  AlgolValProd,
  AlgolValRead,
  AlgolValRelDir,
  AlgolValSizeOf,
  AlgolValSum,
  AlgolValTurnVar,
  AlgolValValue,
  AlgolValLoopRead,
  AlgolValPosX,
  AlgolValPosY,
  AlgolValAddTo,
  AlgolValAddBitsTo,
  AlgolValHighest,
  AlgolValLowest,
  AlgolValBitAnd,
  AlgolValBitDiff,
  AlgolValBitOr,
  AlgolValCompareVals,
  AlgolValCompareSets,
  AlgolValDistance,
} from "./value.interface";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolValValueAnon = AlgolValValue<
  AlgolGameBlobAnon,
  string | number
>;

export type AlgolValAnon = AlgolVal<AlgolGameBlobAnon, string | number>;

export type AlgolValReadAnon = AlgolValRead<AlgolGameBlobAnon>;
export type AlgolValBattleVarAnon = AlgolValBattleVar<AlgolGameBlobAnon>;
export type AlgolValTurnVarAnon = AlgolValTurnVar<AlgolGameBlobAnon>;
export type AlgolValIdAtAnon = AlgolValIdAt<AlgolGameBlobAnon>;
export type AlgolValPosAnon = AlgolValPos<AlgolGameBlobAnon>;
export type AlgolValRelDirAnon = AlgolValRelDir<AlgolGameBlobAnon>;
export type AlgolValGridAtAnon = AlgolValGridAt<AlgolGameBlobAnon>;
export type AlgolValGridInAnon = AlgolValGridIn<AlgolGameBlobAnon>;
export type AlgolValSizeOfAnon = AlgolValSizeOf<AlgolGameBlobAnon>;
export type AlgolValHarvestAnon = AlgolValHarvest<AlgolGameBlobAnon>;
export type AlgolValSumAnon = AlgolValSum<AlgolGameBlobAnon>;
export type AlgolValProdAnon = AlgolValProd<AlgolGameBlobAnon>;
export type AlgolValMinusAnon = AlgolValMinus<AlgolGameBlobAnon>;
export type AlgolValLoopReadAnon = AlgolValLoopRead<AlgolGameBlobAnon>;
export type AlgolValPosXAnon = AlgolValPosX<AlgolGameBlobAnon>;
export type AlgolValPosYAnon = AlgolValPosY<AlgolGameBlobAnon>;
export type AlgolValAddToAnon = AlgolValAddTo<AlgolGameBlobAnon>;
export type AlgolValAddBitsToAnon = AlgolValAddBitsTo<AlgolGameBlobAnon>;
export type AlgolValHighestAnon = AlgolValHighest<AlgolGameBlobAnon>;
export type AlgolValLowestAnon = AlgolValLowest<AlgolGameBlobAnon>;
export type AlgolValBitAndAnon = AlgolValBitAnd<AlgolGameBlobAnon>;
export type AlgolValBitDiffAnon = AlgolValBitDiff<AlgolGameBlobAnon>;
export type AlgolValBitOrAnon = AlgolValBitOr<AlgolGameBlobAnon>;
export type AlgolValCompareValsAnon = AlgolValCompareVals<AlgolGameBlobAnon>;
export type AlgolValCompareSetsAnon = AlgolValCompareSets<AlgolGameBlobAnon>;
export type AlgolValDistanceAnon = AlgolValDistance<AlgolGameBlobAnon>;
