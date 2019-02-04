export * from "./pos.anon";
export * from "./pos.guard";
export * from "./pos.interface";

import {
  AlgolPosIfElse,
  AlgolPosIfActionElse,
  AlgolPosIndexList,
  AlgolPosPlayerCase
} from "./pos.logical";

import {
  AlgolPosBattlePos,
  AlgolPosMark,
  AlgolPosOnlyIn,
  AlgolPosTurnPos
} from "./pos.interface";

export type AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | Mrk
  | ["start"]
  | ["target"]
  | ["looppos"]
  | AlgolPosMark<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosOnlyIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
