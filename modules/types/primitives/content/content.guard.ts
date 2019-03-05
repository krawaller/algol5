import {
  AlgolContentAnon,
  AlgolContentCmndAnon,
  AlgolContentPosAnon,
  AlgolContentUnitAnon,
  AlgolContentUnitPosAnon,
  AlgolContentLineAnon
} from "./content.anon";

import { AlgolContentText, AlgolContentLine } from "./content.interfaces";

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

export function isAlgolContentUnitPos(
  expr: AlgolContentAnon
): expr is AlgolContentUnitPosAnon {
  return (expr as AlgolContentUnitPosAnon).unitpos !== undefined;
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
