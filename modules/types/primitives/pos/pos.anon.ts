import { AlgolPos } from "./";

import {
  AlgolPosMark,
  AlgolPosOnlyIn,
  AlgolPosBattlePos,
  AlgolPosTurnPos,
  AlgolPosOffset,
} from "./pos.interface";

type s = string;

export type AlgolPosAnon = AlgolPos<s, s, s, s, s, s, s, s>;

export type AlgolPosMarkAnon = AlgolPosMark<s, s, s, s, s, s, s, s>;
export type AlgolPosOnlyInAnon = AlgolPosOnlyIn<s, s, s, s, s, s, s, s>;
export type AlgolPosBattlePosAnon = AlgolPosBattlePos<s, s, s, s, s, s, s, s>;
export type AlgolPosTurnPosAnon = AlgolPosTurnPos<s, s, s, s, s, s, s, s>;
export type AlgolPosOffsetAnon = AlgolPosOffset<s, s, s, s, s, s, s, s>;
