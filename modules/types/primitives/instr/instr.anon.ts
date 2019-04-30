import { AlgolInstr, AlgolInstrInner } from "./";

import {
  AlgolInstrLine,
  AlgolInstrUnitAt,
  AlgolInstrOrList,
  AlgolInstrAndList,
  AlgolInstrPluralize,
  AlgolInstrPos,
  AlgolInstrVal,
  AlgolInstrUnitType,
  AlgolInstrPosList,
  AlgolInstrUnitList,
  AlgolInstrUnitTypeSet,
  AlgolInstrUnitTypePos
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
export type AlgolInstrAndListAnon = AlgolInstrAndList<
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
export type AlgolInstrUnitTypeAnon = AlgolInstrUnitType<
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

export type AlgolInstrPosListAnon = AlgolInstrPosList<s, s, s, s, s, s, s, s>;
export type AlgolInstrUnitListAnon = AlgolInstrUnitList<s, s, s, s, s, s, s, s>;
export type AlgolInstrUnitTypeSetAnon = AlgolInstrUnitTypeSet<
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
export type AlgolInstrUnitTypePosAnon = AlgolInstrUnitTypePos<
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
