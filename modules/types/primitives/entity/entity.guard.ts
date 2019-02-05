import {
  AlgolEntityAnon,
  AlgolEntityDataHoleRectAnon,
  AlgolEntityDataRectAnon,
  AlgolEntityDataSitesAnon,
  AlgolEntityHoleRectAnon,
  AlgolEntityRectAnon,
  AlgolEntitySitesAnon
} from "./entity.anon";

export function isAlgolEntityDataHoleRect(
  expr: AlgolEntityAnon
): expr is AlgolEntityDataHoleRectAnon {
  return (expr as AlgolEntityDataHoleRectAnon).dataholerect !== undefined;
}

export function isAlgolEntityDataRect(
  expr: AlgolEntityAnon
): expr is AlgolEntityDataRectAnon {
  return (expr as AlgolEntityDataRectAnon).datarect !== undefined;
}

export function isAlgolEntityDataSites(
  expr: AlgolEntityAnon
): expr is AlgolEntityDataSitesAnon {
  return (expr as AlgolEntityDataSitesAnon).datasites !== undefined;
}

export function isAlgolEntityHoleRect(
  expr: AlgolEntityAnon
): expr is AlgolEntityHoleRectAnon {
  return (expr as AlgolEntityHoleRectAnon).holerect !== undefined;
}

export function isAlgolEntityRect(
  expr: AlgolEntityAnon
): expr is AlgolEntityRectAnon {
  return (expr as AlgolEntityRectAnon).rect !== undefined;
}

export function isAlgolEntitySites(
  expr: AlgolEntityAnon
): expr is AlgolEntitySitesAnon {
  return (expr as AlgolEntitySitesAnon).sites !== undefined;
}
