import {
  AlgolPos,
  AlgolPosMark,
  AlgolPosOnlyIn,
  AlgolPosBattlePos,
  AlgolPosTurnPos
} from "./";

type s = string;

export type AlgolPosAnon = AlgolPos<s, s, s, s, s, s, s, s>;

export type AlgolPosMarkAnon = AlgolPosMark<s, s, s, s, s, s, s, s>;
export type AlgolPosOnlyInAnon = AlgolPosOnlyIn<s, s, s, s, s, s, s, s>;
export type AlgolPosBattlePosAnon = AlgolPosBattlePos<s, s, s, s, s, s, s, s>;
export type AlgolPosTurnPosAnon = AlgolPosTurnPos<s, s, s, s, s, s, s, s>;
