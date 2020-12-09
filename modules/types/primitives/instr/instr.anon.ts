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
  AlgolInstrUnitTypePos,
  AlgolInstrPlayer,
} from "./instr.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolInstrAnon = AlgolInstr<AlgolGameBlobAnon>;
export type AlgolInstrInnerAnon = AlgolInstrInner<AlgolGameBlobAnon>;

export type AlgolInstrValAnon = AlgolInstrVal<AlgolGameBlobAnon>;
export type AlgolInstrPluralizeAnon = AlgolInstrPluralize<AlgolGameBlobAnon>;
export type AlgolInstrPosAnon = AlgolInstrPos<AlgolGameBlobAnon>;
export type AlgolInstrUnitAtAnon = AlgolInstrUnitAt<AlgolGameBlobAnon>;
export type AlgolInstrLineAnon = AlgolInstrLine<AlgolGameBlobAnon>;
export type AlgolInstrOrListAnon = AlgolInstrOrList<AlgolGameBlobAnon>;
export type AlgolInstrAndListAnon = AlgolInstrAndList<AlgolGameBlobAnon>;
export type AlgolInstrUnitTypeAnon = AlgolInstrUnitType<AlgolGameBlobAnon>;

export type AlgolInstrPosListAnon = AlgolInstrPosList<AlgolGameBlobAnon>;
export type AlgolInstrUnitListAnon = AlgolInstrUnitList<AlgolGameBlobAnon>;
export type AlgolInstrUnitTypeSetAnon = AlgolInstrUnitTypeSet<
  AlgolGameBlobAnon
>;
export type AlgolInstrUnitTypePosAnon = AlgolInstrUnitTypePos<
  AlgolGameBlobAnon
>;
export type AlgolInstrPlayerAnon = AlgolInstrPlayer<AlgolGameBlobAnon>;
