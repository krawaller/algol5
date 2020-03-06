import { AlgolEntity } from "./";

import {
  AlgolEntityDataHoleRect,
  AlgolEntityDataRect,
  AlgolEntityDataSites,
  AlgolEntityHoleRect,
  AlgolEntityRect,
  AlgolEntitySites,
} from "./entity.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolEntityAnon = AlgolEntity<AlgolGameBlobAnon>;

export type AlgolEntityDataHoleRectAnon = AlgolEntityDataHoleRect<
  AlgolGameBlobAnon
>;
export type AlgolEntityDataRectAnon = AlgolEntityDataRect<AlgolGameBlobAnon>;
export type AlgolEntityDataSitesAnon = AlgolEntityDataSites<AlgolGameBlobAnon>;
export type AlgolEntityHoleRectAnon = AlgolEntityHoleRect<AlgolGameBlobAnon>;
export type AlgolEntityRectAnon = AlgolEntityRect<AlgolGameBlobAnon>;
export type AlgolEntitySitesAnon = AlgolEntitySites<AlgolGameBlobAnon>;
