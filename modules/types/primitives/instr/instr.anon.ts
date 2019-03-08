import { AlgolInstr, AlgolInstrInner } from "./";

import {
  AlgolInstrLine,
  AlgolInstrUnitAt,
  AlgolInstrOrList,
  AlgolInstrPluralize,
  AlgolInstrPos,
  AlgolInstrVal
} from "./instr.interfaces";

type s = string;

export type AlgolInstrAnon = AlgolInstr<s, s, s, s, s, s, s, s, s>;
export type AlgolInstrInnerAnon = AlgolInstrInner<s, s, s, s, s, s, s, s, s>;

export type AlgolInstrValAnon = AlgolInstrVal<s, s, s, s, s, s, s, s>;
export type AlgolInstrPluralizeAnon = AlgolInstrPluralize<
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
export type AlgolInstrPosAnon = AlgolInstrPos<s, s, s, s, s, s, s, s>;
export type AlgolInstrUnitAtAnon = AlgolInstrUnitAt<s, s, s, s, s, s, s, s>;
export type AlgolInstrLineAnon = AlgolInstrLine<s, s, s, s, s, s, s, s, s>;
export type AlgolInstrOrListAnon = AlgolInstrOrList<s, s, s, s, s, s, s, s, s>;
