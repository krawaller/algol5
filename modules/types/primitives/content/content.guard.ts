import {
  AlgolContentAnon,
  AlgolContentCmndAnon,
  AlgolContentPosAnon,
  AlgolContentUnitAnon,
  AlgolContentLineAnon
} from "./content.anon";

import {
  AlgolContentText,
  AlgolContentUnitType,
  AlgolContentSelect,
  AlgolContentPlayer
} from "./content.interfaces";

export function isAlgolContentCmnd(
  expr: AlgolContentAnon
): expr is AlgolContentCmndAnon {
  return (expr as AlgolContentCmndAnon).command !== undefined;
}

export function isAlgolContentPos(
  expr: AlgolContentAnon
): expr is AlgolContentPosAnon {
  return (expr as AlgolContentPosAnon).pos !== undefined;
}

export function isAlgolContentUnit(
  expr: AlgolContentAnon
): expr is AlgolContentUnitAnon {
  return (expr as AlgolContentUnitAnon).unit !== undefined;
}

export function isAlgolContentUnitType(
  expr: AlgolContentAnon
): expr is AlgolContentUnitType {
  return (expr as AlgolContentUnitType).unittype !== undefined;
}

export function isAlgolContentText(
  expr: AlgolContentAnon
): expr is AlgolContentText {
  return (expr as AlgolContentText).text !== undefined;
}

export function isAlgolContentLine(
  expr: AlgolContentAnon
): expr is AlgolContentLineAnon {
  return (expr as AlgolContentLineAnon).line !== undefined;
}

export function isAlgolContentSelect(
  expr: AlgolContentAnon
): expr is AlgolContentSelect {
  return (expr as AlgolContentSelect).select !== undefined;
}

export function isAlgolContentPlayer(
  expr: AlgolContentAnon
): expr is AlgolContentPlayer {
  return (expr as AlgolContentPlayer).player !== undefined;
}
