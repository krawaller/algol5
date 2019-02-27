export * from "./pos.anon";
export * from "./pos.guard";
export * from "./pos.interface";

import { AlgolExpression } from "../../";

import {
  AlgolPosBattlePos,
  AlgolPosMark,
  AlgolPosOnlyIn,
  AlgolPosTurnPos
} from "./pos.interface";

export type AlgolPos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = AlgolExpression<
  AlgolPosInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

type AlgolPosInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | Mrk
  | ["start"]
  | ["target"]
  | ["looppos"]
  | AlgolPosMark<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosOnlyIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
