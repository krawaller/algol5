import {
  AlgolContentCmndAnon,
  AlgolContentPosAnon,
  AlgolContentUnitAnon,
  AlgolContentUnitPosAnon
} from "./content.anon";

import { AlgolContentText } from "./content.interfaces";

export function isAlgolContentCmnd(
  expr: AlgolContentCmndAnon
): expr is AlgolContentCmndAnon {
  return (expr as AlgolContentCmndAnon).command !== undefined;
}

export function isAlgolContentPos(
  expr: AlgolContentPosAnon
): expr is AlgolContentPosAnon {
  return (expr as AlgolContentPosAnon).pos !== undefined;
}

export function isAlgolContentUnit(
  expr: AlgolContentUnitAnon
): expr is AlgolContentUnitAnon {
  return (expr as AlgolContentUnitAnon).unit !== undefined;
}

export function isAlgolContentUnitPos(
  expr: AlgolContentUnitPosAnon
): expr is AlgolContentUnitPosAnon {
  return (expr as AlgolContentUnitPosAnon).unitpos !== undefined;
}

export function isAlgolContentText(
  expr: AlgolContentText
): expr is AlgolContentText {
  return (expr as AlgolContentText).text !== undefined;
}
