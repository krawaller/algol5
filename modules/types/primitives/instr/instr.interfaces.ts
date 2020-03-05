import { AlgolInstr } from "./";

import { AlgolVal } from "../value";
import { AlgolPos } from "../pos";
import { AlgolSet } from "../set";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolInstrPluralize<Blob extends AlgolGameBlobAnon> {
  pluralize: [
    AlgolVal<Blob, string | number>,
    AlgolInstr<Blob>,
    AlgolInstr<Blob>
  ];
}

export interface AlgolInstrVal<Blob extends AlgolGameBlobAnon> {
  value: AlgolVal<Blob, string | number>;
}

export interface AlgolInstrUnitAt<Blob extends AlgolGameBlobAnon> {
  unitat: AlgolPos<Blob>;
}

export interface AlgolInstrPos<Blob extends AlgolGameBlobAnon> {
  pos: AlgolPos<Blob>;
}

export interface AlgolInstrOrList<Blob extends AlgolGameBlobAnon> {
  orlist: AlgolInstr<Blob>[];
}

export interface AlgolInstrAndList<Blob extends AlgolGameBlobAnon> {
  andlist: AlgolInstr<Blob>[];
}

export interface AlgolInstrLine<Blob extends AlgolGameBlobAnon> {
  line: AlgolInstr<Blob>[];
}

export interface AlgolInstrUnitType<Blob extends AlgolGameBlobAnon> {
  unittype: [Blob["unit"], AlgolVal<Blob, 0 | 1 | 2>];
}

export interface AlgolInstrText {
  text: string;
}

export interface AlgolInstrPosList<Blob extends AlgolGameBlobAnon> {
  poslist: AlgolSet<Blob>;
}

export interface AlgolInstrUnitList<Blob extends AlgolGameBlobAnon> {
  unitlist: AlgolSet<Blob>;
}

export interface AlgolInstrUnitTypeSet<Blob extends AlgolGameBlobAnon> {
  unittypeset: [Blob["unit"], AlgolVal<Blob, 0 | 1 | 2>, AlgolSet<Blob>];
}

export interface AlgolInstrUnitTypePos<Blob extends AlgolGameBlobAnon> {
  unittypepos: [Blob["unit"], AlgolVal<Blob, 0 | 1 | 2>, AlgolPos<Blob>];
}
