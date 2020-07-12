import { AlgolOrder, AlgolOrderInner } from "./";

import {
  AlgolOrderRunGenerators,
  AlgolOrderDoEffects,
  AlgolOrderLinks,
  AlgolOrderAnims,
  AlgolOrderPurge,
} from "./order.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

type s = string;

export type AlgolOrderAnon = AlgolOrder<AlgolGameBlobAnon>;

export type AlgolOrderInnerAnon = AlgolOrderInner<AlgolGameBlobAnon>;

export type AlgolOrderRunGeneratorsAnon = AlgolOrderRunGenerators<
  AlgolGameBlobAnon
>;

export type AlgolOrderDoEffectsAnon = AlgolOrderDoEffects<AlgolGameBlobAnon>;

export type AlgolOrderLinksAnon = AlgolOrderLinks<AlgolGameBlobAnon>;

export type AlgolOrderAnimsAnon = AlgolOrderAnims<AlgolGameBlobAnon>;

export type AlgolOrderPurgeAnon = AlgolOrderPurge<AlgolGameBlobAnon>;
