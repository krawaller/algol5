import { AlgolVal } from ".";

import { AlgolPos } from "../pos";
import { AlgolSet } from "../set";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolValValue<Blob extends AlgolGameBlobAnon, _T> {
  value: AlgolVal<Blob, _T>;
}

export interface AlgolValRead<Blob extends AlgolGameBlobAnon> {
  read: [AlgolSet<Blob>, AlgolPos<Blob>, AlgolVal<Blob, string>];
}

export interface AlgolValAddTo<Blob extends AlgolGameBlobAnon> {
  addto: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, string>,
    AlgolVal<Blob, number>
  ];
}

export interface AlgolValAddBitsTo<Blob extends AlgolGameBlobAnon> {
  addbitsto: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, string>,
    AlgolVal<Blob, number>
  ];
}

export interface AlgolValLoopRead<Blob extends AlgolGameBlobAnon> {
  loopread: AlgolVal<Blob, string>;
}

export interface AlgolValBattleVar<Blob extends AlgolGameBlobAnon> {
  battlevar: AlgolVal<Blob, Blob["btlv"]>;
}

export interface AlgolValTurnVar<Blob extends AlgolGameBlobAnon> {
  turnvar: AlgolVal<Blob, Blob["turnv"]>;
}

export interface AlgolValIdAt<Blob extends AlgolGameBlobAnon> {
  idat: AlgolPos<Blob>;
}

export interface AlgolValPos<Blob extends AlgolGameBlobAnon> {
  pos: AlgolPos<Blob>;
}

export interface AlgolValRelDir<Blob extends AlgolGameBlobAnon> {
  reldir: [AlgolVal<Blob, string | number>, AlgolVal<Blob, string | number>];
}

export interface AlgolValGridIn<Blob extends AlgolGameBlobAnon> {
  gridin: [AlgolVal<Blob, Blob["grid"]>, AlgolSet<Blob>];
}

export interface AlgolValGridAt<Blob extends AlgolGameBlobAnon> {
  gridat: [AlgolVal<Blob, Blob["grid"]>, AlgolPos<Blob>];
}

export interface AlgolValSizeOf<Blob extends AlgolGameBlobAnon> {
  sizeof: AlgolSet<Blob>;
}

export interface AlgolValHarvest<Blob extends AlgolGameBlobAnon> {
  harvest: [AlgolSet<Blob>, AlgolVal<Blob, string | number>];
}

export interface AlgolValSum<Blob extends AlgolGameBlobAnon> {
  sum: AlgolVal<Blob, number>[];
}

export interface AlgolValProd<Blob extends AlgolGameBlobAnon> {
  prod: AlgolVal<Blob, number>[];
}

export interface AlgolValMinus<Blob extends AlgolGameBlobAnon> {
  minus: AlgolVal<Blob, number>[];
}

export interface AlgolValPosX<Blob extends AlgolGameBlobAnon> {
  posx: AlgolPos<Blob>;
}

export interface AlgolValPosY<Blob extends AlgolGameBlobAnon> {
  posy: AlgolPos<Blob>;
}

export interface AlgolValHighest<Blob extends AlgolGameBlobAnon> {
  highest: AlgolVal<Blob, number>[];
}

export interface AlgolValLowest<Blob extends AlgolGameBlobAnon> {
  lowest: AlgolVal<Blob, number>[];
}
