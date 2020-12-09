import { AlgolVal } from "../value";
import { AlgolSet } from "../set";
import { AlgolPos } from ".";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolPosMark<Blob extends AlgolGameBlobAnon> = {
  mark: AlgolVal<Blob, Blob["mrk"]>;
};

export type AlgolPosBattlePos<Blob extends AlgolGameBlobAnon> = {
  battlepos: AlgolVal<Blob, Blob["btlp"]>;
};

export type AlgolPosTurnPos<Blob extends AlgolGameBlobAnon> = {
  turnpos: AlgolVal<Blob, Blob["turnp"]>;
};

export type AlgolPosOnlyIn<Blob extends AlgolGameBlobAnon> = {
  onlyin: AlgolSet<Blob>;
};

export type AlgolPosFromXY<Blob extends AlgolGameBlobAnon> = {
  fromxy: [AlgolVal<Blob, number>, AlgolVal<Blob, number>];
};

export type AlgolPosOffset<Blob extends AlgolGameBlobAnon> = {
  offset: // pos, dir, forward, right
  | [
        // pos
        AlgolPos<Blob>,
        // dir
        AlgolVal<Blob, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>,
        // steps forward
        AlgolVal<Blob, number>,
        // steps right
        AlgolVal<Blob, number>
      ]
    // pos, dir, forward (right defaults to 0)
    | [
        // pos
        AlgolPos<Blob>,
        // dir
        AlgolVal<Blob, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>,
        // steps forward
        AlgolVal<Blob, number>
      ]
    // pos, dir (forward defaults to 1, right to 0)
    | [
        // pos
        AlgolPos<Blob>,
        // dir
        AlgolVal<Blob, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>
      ];
};
