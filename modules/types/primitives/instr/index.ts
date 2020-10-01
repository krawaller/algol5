export * from "./instr.anon";
export * from "./instr.interfaces";
export * from "./instr.guard";

import {
  AlgolInstrLine,
  AlgolInstrUnitAt,
  AlgolInstrOrList,
  AlgolInstrAndList,
  AlgolInstrPluralize,
  AlgolInstrPos,
  AlgolInstrVal,
  AlgolInstrUnitType,
  AlgolInstrText,
  AlgolInstrPosList,
  AlgolInstrUnitList,
  AlgolInstrUnitTypeSet,
  AlgolInstrUnitTypePos,
  AlgolInstrPlayer,
} from "./instr.interfaces";

import { AlgolIfableExpression } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolInstr<Blob extends AlgolGameBlobAnon> = AlgolIfableExpression<
  Blob,
  AlgolInstrInner<Blob>
>;

export type AlgolInstrInner<Blob extends AlgolGameBlobAnon> =
  | string
  | number
  | Blob["cmnd"]
  | Blob["unit"]
  | ["defaultEndTurnInstruction"]
  | ["otherplayer"]
  | AlgolInstrVal<Blob>
  | AlgolInstrPluralize<Blob>
  | AlgolInstrPos<Blob>
  | AlgolInstrUnitAt<Blob>
  | AlgolInstrLine<Blob>
  | AlgolInstrOrList<Blob>
  | AlgolInstrAndList<Blob>
  | AlgolInstrUnitType<Blob>
  | AlgolInstrPosList<Blob>
  | AlgolInstrUnitList<Blob>
  | AlgolInstrUnitTypeSet<Blob>
  | AlgolInstrUnitTypePos<Blob>
  | AlgolInstrText
  | AlgolInstrPlayer<Blob>;
