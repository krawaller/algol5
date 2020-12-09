import { AlgolSet } from "./";
import { AlgolVal } from "../value";
import { AlgolPos } from "../pos";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolSetLayer<Blob extends AlgolGameBlobAnon> = {
  layer: AlgolVal<Blob, Blob["layer"]>;
};

export type AlgolSetSingle<Blob extends AlgolGameBlobAnon> = {
  single: AlgolPos<Blob>;
};

export type AlgolSetSingles<Blob extends AlgolGameBlobAnon> = {
  singles: AlgolPos<Blob>[];
};

export type AlgolSetGroupAt<Blob extends AlgolGameBlobAnon> = {
  groupat: AlgolPos<Blob>;
};

export type AlgolSetUnion<Blob extends AlgolGameBlobAnon> = {
  union: AlgolSet<Blob>[];
};

export type AlgolSetIntersect<Blob extends AlgolGameBlobAnon> = {
  intersect: AlgolSet<Blob>[];
};

export type AlgolSetSubtract<Blob extends AlgolGameBlobAnon> = {
  subtract: AlgolSet<Blob>[];
};

export type AlgolSetExceptPos<Blob extends AlgolGameBlobAnon> = {
  exceptpos: [AlgolSet<Blob>, AlgolPos<Blob>];
};
