import { AlgolPos, AlgolVal, AlgolSet } from "../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolAnimEnterFrom<Blob extends AlgolGameBlobAnon> = {
  enterfrom: [AlgolPos<Blob>, AlgolPos<Blob>];
};

export type AlgolAnimEnterIn<Blob extends AlgolGameBlobAnon> = {
  enterin: [AlgolSet<Blob>, AlgolPos<Blob>];
};

export type AlgolAnimExitTo<Blob extends AlgolGameBlobAnon> = {
  exitto: [AlgolPos<Blob>, AlgolPos<Blob>];
};

export type AlgolAnimExitIn<Blob extends AlgolGameBlobAnon> = {
  exitin: [AlgolSet<Blob>, AlgolPos<Blob>];
};

export type AlgolAnimGhost<Blob extends AlgolGameBlobAnon> = {
  ghost: [
    AlgolPos<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2>
  ];
};

export type AlgolAnimGhostFromIn<Blob extends AlgolGameBlobAnon> = {
  ghostfromin: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2>
  ];
};

export type AlgolAnimGhostToIn<Blob extends AlgolGameBlobAnon> = {
  ghosttoin: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2>
  ];
};
