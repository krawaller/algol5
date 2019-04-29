import {
  AlgolInstrAnon,
  AlgolInstrLineAnon,
  AlgolInstrUnitAtAnon,
  AlgolInstrOrListAnon,
  AlgolInstrAndListAnon,
  AlgolInstrPluralizeAnon,
  AlgolInstrPosAnon,
  AlgolInstrValAnon,
  AlgolInstrUnitTypeAnon,
  AlgolInstrPosListAnon,
  AlgolInstrUnitListAnon,
  AlgolInstrUnitTypeSetAnon
} from "./instr.anon";
import { AlgolInstrText } from "./instr.interfaces";

export function isAlgolInstrVal(
  expr: AlgolInstrAnon
): expr is AlgolInstrValAnon {
  return (expr as AlgolInstrValAnon).value !== undefined;
}

export function isAlgolInstrPluralize(
  expr: AlgolInstrAnon
): expr is AlgolInstrPluralizeAnon {
  return (expr as AlgolInstrPluralizeAnon).pluralize !== undefined;
}

export function isAlgolInstrPos(
  expr: AlgolInstrAnon
): expr is AlgolInstrPosAnon {
  return (expr as AlgolInstrPosAnon).pos !== undefined;
}

export function isAlgolInstrUnitAt(
  expr: AlgolInstrAnon
): expr is AlgolInstrUnitAtAnon {
  return (expr as AlgolInstrUnitAtAnon).unitat !== undefined;
}

export function isAlgolInstrLine(
  expr: AlgolInstrAnon
): expr is AlgolInstrLineAnon {
  return (expr as AlgolInstrLineAnon).line !== undefined;
}

export function isAlgolInstrOrList(
  expr: AlgolInstrAnon
): expr is AlgolInstrOrListAnon {
  return (expr as AlgolInstrOrListAnon).orlist !== undefined;
}

export function isAlgolInstrAndList(
  expr: AlgolInstrAnon
): expr is AlgolInstrAndListAnon {
  return (expr as AlgolInstrAndListAnon).andlist !== undefined;
}

export function isAlgolInstrUnitType(
  expr: AlgolInstrAnon
): expr is AlgolInstrUnitTypeAnon {
  return (expr as AlgolInstrUnitTypeAnon).unittype !== undefined;
}

export function isAlgolInstrText(expr: AlgolInstrAnon): expr is AlgolInstrText {
  return (expr as AlgolInstrText).text !== undefined;
}

export function isAlgolInstrPosList(
  expr: AlgolInstrAnon
): expr is AlgolInstrPosListAnon {
  return (expr as AlgolInstrPosListAnon).poslist !== undefined;
}

export function isAlgolInstrUnitList(
  expr: AlgolInstrAnon
): expr is AlgolInstrUnitListAnon {
  return (expr as AlgolInstrUnitListAnon).unitlist !== undefined;
}

export function isAlgolInstrUnitTypeSet(
  expr: AlgolInstrAnon
): expr is AlgolInstrUnitTypeSetAnon {
  return (expr as AlgolInstrUnitTypeSetAnon).unittypeset !== undefined;
}
