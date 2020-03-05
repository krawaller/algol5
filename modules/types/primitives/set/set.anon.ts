import { AlgolSet } from "./";

import {
  AlgolSetGroupAt,
  AlgolSetIntersect,
  AlgolSetLayer,
  AlgolSetSingle,
  AlgolSetSingles,
  AlgolSetSubtract,
  AlgolSetUnion,
  AlgolSetExceptPos,
} from "./set.interface";

import { AlgolGameBlobAnon } from "../../blob";

export type AlgolSetAnon = AlgolSet<AlgolGameBlobAnon>;
export type AlgolSetLayerAnon = AlgolSetLayer<AlgolGameBlobAnon>;
export type AlgolSetSingleAnon = AlgolSetSingle<AlgolGameBlobAnon>;
export type AlgolSetSinglesAnon = AlgolSetSingles<AlgolGameBlobAnon>;
export type AlgolSetGroupAtAnon = AlgolSetGroupAt<AlgolGameBlobAnon>;
export type AlgolSetUnionAnon = AlgolSetUnion<AlgolGameBlobAnon>;
export type AlgolSetIntersectAnon = AlgolSetIntersect<AlgolGameBlobAnon>;
export type AlgolSetSubtractAnon = AlgolSetSubtract<AlgolGameBlobAnon>;
export type AlgolSetExceptPosAnon = AlgolSetExceptPos<AlgolGameBlobAnon>;
