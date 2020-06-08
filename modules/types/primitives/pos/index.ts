export * from "./pos.anon";
export * from "./pos.guard";
export * from "./pos.interface";

import { AlgolExpression } from "../../";

import {
  AlgolPosBattlePos,
  AlgolPosMark,
  AlgolPosOnlyIn,
  AlgolPosTurnPos,
  AlgolPosOffset,
  AlgolPosFromXY,
} from "./pos.interface";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolPos<Blob extends AlgolGameBlobAnon> = AlgolExpression<
  Blob,
  AlgolPosInner<Blob>
>;

type AlgolPosInner<Blob extends AlgolGameBlobAnon> =
  | Blob["mrk"]
  | ["start"]
  | ["target"]
  | ["looppos"]
  | AlgolPosMark<Blob>
  | AlgolPosOnlyIn<Blob>
  | AlgolPosBattlePos<Blob>
  | AlgolPosTurnPos<Blob>
  | AlgolPosOffset<Blob>
  | AlgolPosFromXY<Blob>;
