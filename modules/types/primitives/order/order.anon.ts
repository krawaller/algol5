import { AlgolOrder, AlgolOrderInner } from "./";

import {
  AlgolOrderRunGenerators,
  AlgolOrderDoEffects,
  AlgolOrderLinks,
  AlgolOrderAnims
} from "./order.interfaces";

type s = string;

export type AlgolOrderAnon = AlgolOrder<s, s, s, s, s, s, s, s, s, s>;

export type AlgolOrderInnerAnon = AlgolOrderInner<s, s, s, s, s, s, s, s, s, s>;

export type AlgolOrderRunGeneratorsAnon = AlgolOrderRunGenerators<
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;

export type AlgolOrderDoEffectsAnon = AlgolOrderDoEffects<
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;

export type AlgolOrderLinksAnon = AlgolOrderLinks<s, s, s, s, s, s, s, s, s, s>;

export type AlgolOrderAnimsAnon = AlgolOrderAnims<s, s, s, s, s, s, s, s, s, s>;
