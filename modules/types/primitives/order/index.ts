export * from "./order.anon";
export * from "./order.interfaces";
export * from "./order.guard";

import {
  AlgolOrderRunGenerators,
  AlgolOrderDoEffects,
  AlgolOrderLinks,
  AlgolOrderAnims,
  AlgolOrderPurge,
} from "./order.interfaces";

import { AlgolStatement } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolOrder<Blob extends AlgolGameBlobAnon> = AlgolStatement<
  Blob,
  AlgolOrderInner<Blob>
>;

export type AlgolOrderInner<Blob extends AlgolGameBlobAnon> =
  | ["unitLayers"]
  | AlgolOrderRunGenerators<Blob>
  | AlgolOrderDoEffects<Blob>
  | AlgolOrderLinks<Blob>
  | AlgolOrderAnims<Blob>
  | AlgolOrderPurge<Blob>;
