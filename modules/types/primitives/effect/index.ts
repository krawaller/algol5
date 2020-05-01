export * from "./effect.anon";
export * from "./effect.interfaces";
export * from "./effect.guard";

import { AlgolStatement } from "../../";

import {
  AlgolEffectKillAt,
  AlgolEffectKillIn,
  AlgolEffectKillId,
  AlgolEffectMoveAt,
  AlgolEffectMoveId,
  AlgolEffectPushIn,
  AlgolEffectPushAt,
  AlgolEffectSetAt,
  AlgolEffectSetBattlePos,
  AlgolEffectSetBattleVar,
  AlgolEffectSetId,
  AlgolEffectSetIn,
  AlgolEffectSetTurnPos,
  AlgolEffectSetTurnVar,
  AlgolEffectSpawnAt,
  AlgolEffectSpawnIn,
  AlgolEffectStompAt,
  AlgolEffectStompId,
  AlgolEffectMorphAt,
  AlgolEffectMorphId,
  AlgolEffectMorphIn,
  AlgolEffectAdoptAt,
  AlgolEffectAdoptId,
  AlgolEffectAdoptIn,
  AlgolEffectIncreaseBattleVar,
  AlgolEffectIncreaseTurnVar,
} from "./effect.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolEffect<Blob extends AlgolGameBlobAnon> = AlgolStatement<
  Blob,
  AlgolEffectInner<Blob>
>;

export type AlgolEffectInner<Blob extends AlgolGameBlobAnon> =
  | AlgolEffectMoveAt<Blob>
  | AlgolEffectMoveId<Blob>
  | AlgolEffectStompAt<Blob>
  | AlgolEffectStompId<Blob>
  | AlgolEffectSetTurnPos<Blob>
  | AlgolEffectSetBattlePos<Blob>
  | AlgolEffectSetTurnVar<Blob>
  | AlgolEffectSetBattleVar<Blob>
  | AlgolEffectIncreaseTurnVar<Blob>
  | AlgolEffectIncreaseBattleVar<Blob>
  | AlgolEffectPushIn<Blob>
  | AlgolEffectPushAt<Blob>
  | AlgolEffectKillIn<Blob>
  | AlgolEffectKillAt<Blob>
  | AlgolEffectKillId<Blob>
  | AlgolEffectSetAt<Blob>
  | AlgolEffectSetIn<Blob>
  | AlgolEffectSetId<Blob>
  | AlgolEffectMorphAt<Blob>
  | AlgolEffectMorphIn<Blob>
  | AlgolEffectMorphId<Blob>
  | AlgolEffectAdoptAt<Blob>
  | AlgolEffectAdoptIn<Blob>
  | AlgolEffectAdoptId<Blob>
  | AlgolEffectSpawnAt<Blob>
  | AlgolEffectSpawnIn<Blob>;
