import { AlgolContent } from "./";

import {
  AlgolContentCmnd,
  AlgolContentPos,
  AlgolContentUnitPos,
  AlgolContentUnit
} from "./content.interfaces";

type s = string;

export type AlgolContentAnon = AlgolContent<s, s, s>;

export type AlgolContentCmndAnon = AlgolContentCmnd<s>;
export type AlgolContentPosAnon = AlgolContentPos<s>;
export type AlgolContentUnitPosAnon = AlgolContentUnitPos<s, s>;
export type AlgolContentUnitAnon = AlgolContentUnit<s>;
