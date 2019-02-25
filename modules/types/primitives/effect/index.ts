export * from "./effect.anon";
export * from "./effect.interfaces";
export * from "./effect.logical";
export * from "./effect.guard";

import {
  AlgolEffectIf,
  AlgolEffectIfPlayer,
  AlgolEffectIfActionElse,
  AlgolEffectIfElse,
  AlgolEffectIndexList,
  AlgolEffectPlayerCase,
  AlgolEffectMulti
} from "./effect.logical";

import {
  AlgolEffectForIdIn,
  AlgolEffectForPosIn,
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
  AlgolEffectAdoptIn
} from "./effect.interfaces";

export type AlgolEffect<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> =
  | AlgolEffectMoveAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectMoveId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectStompAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectStompId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetTurnVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetBattleVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectPushIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectPushAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectKillIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectKillAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectKillId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSetId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectMorphAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectMorphIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectMorphId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectAdoptAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectAdoptIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectAdoptId<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolEffectSpawnAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectSpawnIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectForPosIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectForIdIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectMulti<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectIfPlayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | AlgolEffectIfActionElse<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >
  | AlgolEffectPlayerCase<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >
  | AlgolEffectIndexList<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv,
      Unit
    >;
