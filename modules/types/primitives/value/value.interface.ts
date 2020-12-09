import { AlgolVal } from ".";

import { AlgolPos } from "../pos";
import { AlgolSet } from "../set";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolValValue<Blob extends AlgolGameBlobAnon, _T> = {
  value: AlgolVal<Blob, _T>;
};

export type AlgolValRead<Blob extends AlgolGameBlobAnon> = {
  read: [AlgolSet<Blob>, AlgolPos<Blob>, AlgolVal<Blob, string>];
};

export type AlgolValAddTo<Blob extends AlgolGameBlobAnon> = {
  addto: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, string>,
    AlgolVal<Blob, number>
  ];
};

export type AlgolValAddBitsTo<Blob extends AlgolGameBlobAnon> = {
  addbitsto: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, string>,
    AlgolVal<Blob, number>
  ];
};

export type AlgolValLoopRead<Blob extends AlgolGameBlobAnon> = {
  loopread: AlgolVal<Blob, string>;
};

export type AlgolValBattleVar<Blob extends AlgolGameBlobAnon> = {
  battlevar: AlgolVal<Blob, Blob["btlv"]>;
};

export type AlgolValTurnVar<Blob extends AlgolGameBlobAnon> = {
  turnvar: AlgolVal<Blob, Blob["turnv"]>;
};

export type AlgolValIdAt<Blob extends AlgolGameBlobAnon> = {
  idat: AlgolPos<Blob>;
};

export type AlgolValPos<Blob extends AlgolGameBlobAnon> = {
  pos: AlgolPos<Blob>;
};

export type AlgolValRelDir<Blob extends AlgolGameBlobAnon> = {
  reldir: [AlgolVal<Blob, string | number>, AlgolVal<Blob, string | number>];
};

export type AlgolValGridIn<Blob extends AlgolGameBlobAnon> = {
  gridin: [AlgolVal<Blob, Blob["grid"]>, AlgolSet<Blob>];
};

export type AlgolValGridAt<Blob extends AlgolGameBlobAnon> = {
  gridat: [AlgolVal<Blob, Blob["grid"]>, AlgolPos<Blob>];
};

export type AlgolValSizeOf<Blob extends AlgolGameBlobAnon> = {
  sizeof: AlgolSet<Blob>;
};

export type AlgolValHarvest<Blob extends AlgolGameBlobAnon> = {
  harvest: [AlgolSet<Blob>, AlgolVal<Blob, string | number>];
};

export type AlgolValSum<Blob extends AlgolGameBlobAnon> = {
  sum: AlgolVal<Blob, number>[];
};

export type AlgolValProd<Blob extends AlgolGameBlobAnon> = {
  prod: AlgolVal<Blob, number>[];
};

export type AlgolValMinus<Blob extends AlgolGameBlobAnon> = {
  minus: AlgolVal<Blob, number>[];
};

export type AlgolValPosX<Blob extends AlgolGameBlobAnon> = {
  posx: AlgolPos<Blob>;
};

export type AlgolValPosY<Blob extends AlgolGameBlobAnon> = {
  posy: AlgolPos<Blob>;
};

export type AlgolValHighest<Blob extends AlgolGameBlobAnon> = {
  highest: AlgolVal<Blob, number>[];
};

export type AlgolValLowest<Blob extends AlgolGameBlobAnon> = {
  lowest: AlgolVal<Blob, number>[];
};

export type AlgolValBitAnd<Blob extends AlgolGameBlobAnon> = {
  bitand: AlgolVal<Blob, number>[];
};

export type AlgolValBitOr<Blob extends AlgolGameBlobAnon> = {
  bitor: AlgolVal<Blob, number>[];
};

export type AlgolValBitDiff<Blob extends AlgolGameBlobAnon> = {
  bitdiff: AlgolVal<Blob, number>[];
};

export type AlgolValCompareVals<Blob extends AlgolGameBlobAnon> = {
  compareVals: [AlgolVal<Blob, number>, AlgolVal<Blob, number>];
};

export type AlgolValCompareSets<Blob extends AlgolGameBlobAnon> = {
  compareSets: [AlgolSet<Blob>, AlgolSet<Blob>];
};

export type AlgolValDistance<Blob extends AlgolGameBlobAnon> = {
  distance: [AlgolPos<Blob>, AlgolPos<Blob>];
};
