export * from "./set.anon";
export * from "./set.guard";
export * from "./set.interface";

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

import { AlgolExpression } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolSet<Blob extends AlgolGameBlobAnon> = AlgolExpression<
  Blob,
  AlgolSetInner<Blob>
>;

type AlgolSetInner<Blob extends AlgolGameBlobAnon> =
  | Blob["layer"]
  | ["empty"]
  | ["loopset"]
  | AlgolSetLayer<Blob>
  | AlgolSetSingle<Blob>
  | AlgolSetSingles<Blob>
  | AlgolSetGroupAt<Blob>
  | AlgolSetUnion<Blob>
  | AlgolSetIntersect<Blob>
  | AlgolSetSubtract<Blob>
  | AlgolSetExceptPos<Blob>;
