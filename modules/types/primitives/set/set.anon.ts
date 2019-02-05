import { AlgolSet } from "./";

import {
  AlgolSetGroupAt,
  AlgolSetIntersect,
  AlgolSetLayer,
  AlgolSetSingle,
  AlgolSetSingles,
  AlgolSetSubtract,
  AlgolSetUnion
} from "./set.interface";

type s = string;

export type AlgolSetAnon = AlgolSet<s, s, s, s, s, s, s, s>;
export type AlgolSetLayerAnon = AlgolSetLayer<s, s, s, s, s, s, s, s>;
export type AlgolSetSingleAnon = AlgolSetSingle<s, s, s, s, s, s, s, s>;
export type AlgolSetSinglesAnon = AlgolSetSingles<s, s, s, s, s, s, s, s>;
export type AlgolSetGroupAtAnon = AlgolSetGroupAt<s, s, s, s, s, s, s, s>;
export type AlgolSetUnionAnon = AlgolSetUnion<s, s, s, s, s, s, s, s>;
export type AlgolSetIntersectAnon = AlgolSetIntersect<s, s, s, s, s, s, s, s>;
export type AlgolSetSubtractAnon = AlgolSetSubtract<s, s, s, s, s, s, s, s>;
