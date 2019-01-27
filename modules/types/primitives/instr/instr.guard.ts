import {
  AlgolInstrAnon,
  AlgolInstrLineAnon,
  AlgolInstrNameAtAnon,
  AlgolInstrOrListAnon,
  AlgolInstrPluralizeAnon,
  AlgolInstrPosAnon,
  AlgolInstrValAnon
} from "./instr.anon";

export function isAlgolInstrVal(
  expr: AlgolInstrAnon
): expr is AlgolInstrValAnon {
  return !!(expr as AlgolInstrValAnon).value;
}

export function isAlgolInstrPluralize(
  expr: AlgolInstrAnon
): expr is AlgolInstrPluralizeAnon {
  return !!(expr as AlgolInstrPluralizeAnon).pluralize;
}

export function isAlgolInstrPos(
  expr: AlgolInstrAnon
): expr is AlgolInstrPosAnon {
  return !!(expr as AlgolInstrPosAnon).pos;
}

export function isAlgolInstrNameAt(
  expr: AlgolInstrAnon
): expr is AlgolInstrNameAtAnon {
  return !!(expr as AlgolInstrNameAtAnon).nameat;
}

export function isAlgolInstrLine(
  expr: AlgolInstrAnon
): expr is AlgolInstrLineAnon {
  return !!(expr as AlgolInstrLineAnon).line;
}

export function isAlgolInstrOrList(
  expr: AlgolInstrAnon
): expr is AlgolInstrOrListAnon {
  return !!(expr as AlgolInstrOrListAnon).orlist;
}
