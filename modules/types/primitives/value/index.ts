export * from "./value.anon";
export * from "./value.guard";
export * from "./value.interface";

import { AlgolExpression } from "../../";

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
} from "./value.interface";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolVal<Blob extends AlgolGameBlobAnon, _T> = AlgolExpression<
  Blob,
  AlgolValInner<Blob, _T>
>;

type AlgolValInner<Blob extends AlgolGameBlobAnon, _T> =
  | _T
  | ["dir"]
  | ["offsetdir"]
  | ["stopreason"]
  | ["loopid"]
  | ["player"]
  | ["otherplayer"]
  | ["turn"]
  | ["countsofar"]
  | ["totalcount"]
  | ["neighbourcount"]
  | ["walklength"]
  | ["max"]
  | ["step"]
  | ["boardheight"]
  | ["boardwidth"]
  | AlgolValValue<Blob, _T>
  | AlgolValRead<Blob>
  | AlgolValBattleVar<Blob>
  | AlgolValTurnVar<Blob>
  | AlgolValIdAt<Blob>
  | AlgolValPos<Blob>
  | AlgolValRelDir<Blob>
  | AlgolValGridAt<Blob>
  | AlgolValGridIn<Blob>
  | AlgolValSizeOf<Blob>
  | AlgolValHarvest<Blob>
  | AlgolValSum<Blob>
  | AlgolValProd<Blob>
  | AlgolValMinus<Blob>
  | AlgolValLoopRead<Blob>
  | AlgolValPosX<Blob>
  | AlgolValPosY<Blob>
  | AlgolValAddTo<Blob>;
