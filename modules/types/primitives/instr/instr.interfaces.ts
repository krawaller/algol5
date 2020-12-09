import { AlgolInstr } from "./";

import { AlgolVal } from "../value";
import { AlgolPos } from "../pos";
import { AlgolSet } from "../set";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolInstrPluralize<Blob extends AlgolGameBlobAnon> = {
  pluralize: [
    AlgolVal<Blob, string | number>,
    AlgolInstr<Blob>,
    AlgolInstr<Blob>
  ];
};

export type AlgolInstrVal<Blob extends AlgolGameBlobAnon> = {
  value: AlgolVal<Blob, string | number>;
};

export type AlgolInstrUnitAt<Blob extends AlgolGameBlobAnon> = {
  unitat: AlgolPos<Blob>;
};

export type AlgolInstrPos<Blob extends AlgolGameBlobAnon> = {
  pos: AlgolPos<Blob>;
};

export type AlgolInstrOrList<Blob extends AlgolGameBlobAnon> = {
  orlist: AlgolInstr<Blob>[];
};

export type AlgolInstrAndList<Blob extends AlgolGameBlobAnon> = {
  andlist: AlgolInstr<Blob>[];
};

export type AlgolInstrLine<Blob extends AlgolGameBlobAnon> = {
  line: AlgolInstr<Blob>[];
};

export type AlgolInstrUnitType<Blob extends AlgolGameBlobAnon> = {
  unittype: [
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2 | 12 | "01" | "02">
  ];
};

export type AlgolInstrText = {
  text: string;
};

export type AlgolInstrPosList<Blob extends AlgolGameBlobAnon> = {
  poslist: AlgolSet<Blob>;
};

export type AlgolInstrUnitList<Blob extends AlgolGameBlobAnon> = {
  unitlist: AlgolSet<Blob>;
};

export type AlgolInstrUnitTypeSet<Blob extends AlgolGameBlobAnon> = {
  unittypeset: [
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2 | 12 | "01" | "02">,
    AlgolSet<Blob>
  ];
};

export type AlgolInstrUnitTypePos<Blob extends AlgolGameBlobAnon> = {
  unittypepos: [
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2 | 12 | "01" | "02">,
    AlgolPos<Blob>
  ];
};

export type AlgolInstrPlayer<Blob extends AlgolGameBlobAnon> = {
  player: AlgolVal<Blob, 1 | 2>;
};
