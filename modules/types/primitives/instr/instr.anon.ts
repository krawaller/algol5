import { AlgolInstr } from "./";

import {
  AlgolInstrLine,
  AlgolInstrNameAt,
  AlgolInstrOrList,
  AlgolInstrPluralize,
  AlgolInstrPos,
  AlgolInstrVal
} from "./instr.interfaces";

type s = string;

export type AlgolInstrAnon = AlgolInstr<s, s, s, s, s, s, s, s, s>;

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
export type AlgolInstrNameAtAnon = AlgolInstrNameAt<s, s, s, s, s, s, s, s>;
export type AlgolInstrLineAnon = AlgolInstrLine<s, s, s, s, s, s, s, s, s>;
export type AlgolInstrOrListAnon = AlgolInstrOrList<s, s, s, s, s, s, s, s, s>;
