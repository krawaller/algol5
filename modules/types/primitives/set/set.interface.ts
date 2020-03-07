import { AlgolSet } from "./";
import { AlgolVal } from "../value";
import { AlgolPos } from "../pos";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolSetLayer<Blob extends AlgolGameBlobAnon> {
  layer: AlgolVal<Blob, Blob["layer"]>;
}

export interface AlgolSetSingle<Blob extends AlgolGameBlobAnon> {
  single: AlgolPos<Blob>;
}

export interface AlgolSetSingles<Blob extends AlgolGameBlobAnon> {
  singles: AlgolPos<Blob>[];
}

export interface AlgolSetGroupAt<Blob extends AlgolGameBlobAnon> {
  groupat: AlgolPos<Blob>;
}

export interface AlgolSetUnion<Blob extends AlgolGameBlobAnon> {
  union: AlgolSet<Blob>[];
}

export interface AlgolSetIntersect<Blob extends AlgolGameBlobAnon> {
  intersect: AlgolSet<Blob>[];
}

export interface AlgolSetSubtract<Blob extends AlgolGameBlobAnon> {
  subtract: AlgolSet<Blob>[];
}

export interface AlgolSetExceptPos<Blob extends AlgolGameBlobAnon> {
  exceptpos: [AlgolSet<Blob>, AlgolPos<Blob>];
}
