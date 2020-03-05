import { AlgolPos, AlgolVal, AlgolSet } from "../";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolAnimEnterFrom<Blob extends AlgolGameBlobAnon> {
  enterfrom: [AlgolPos<Blob>, AlgolPos<Blob>];
}

export interface AlgolAnimEnterIn<Blob extends AlgolGameBlobAnon> {
  enterin: [AlgolSet<Blob>, AlgolPos<Blob>];
}

export interface AlgolAnimExitTo<Blob extends AlgolGameBlobAnon> {
  exitto: [AlgolPos<Blob>, AlgolPos<Blob>];
}

export interface AlgolAnimExitIn<Blob extends AlgolGameBlobAnon> {
  exitin: [AlgolSet<Blob>, AlgolPos<Blob>];
}

export interface AlgolAnimGhost<Blob extends AlgolGameBlobAnon> {
  ghost: [
    AlgolPos<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2>
  ];
}

export interface AlgolAnimGhostFromIn<Blob extends AlgolGameBlobAnon> {
  ghostfromin: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2>
  ];
}

export interface AlgolAnimGhostToIn<Blob extends AlgolGameBlobAnon> {
  ghosttoin: [
    AlgolSet<Blob>,
    AlgolPos<Blob>,
    AlgolVal<Blob, Blob["unit"]>,
    AlgolVal<Blob, 0 | 1 | 2>
  ];
}
