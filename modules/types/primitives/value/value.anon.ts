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
