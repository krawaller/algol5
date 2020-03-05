import { AlgolPos } from "./";

import {
  AlgolPosMark,
  AlgolPosOnlyIn,
  AlgolPosBattlePos,
  AlgolPosTurnPos,
  AlgolPosOffset,
} from "./pos.interface";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolPosAnon = AlgolPos<AlgolGameBlobAnon>;

export type AlgolPosMarkAnon = AlgolPosMark<AlgolGameBlobAnon>;
export type AlgolPosOnlyInAnon = AlgolPosOnlyIn<AlgolGameBlobAnon>;
export type AlgolPosBattlePosAnon = AlgolPosBattlePos<AlgolGameBlobAnon>;
export type AlgolPosTurnPosAnon = AlgolPosTurnPos<AlgolGameBlobAnon>;
export type AlgolPosOffsetAnon = AlgolPosOffset<AlgolGameBlobAnon>;
