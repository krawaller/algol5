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
  AlgolSetUnion
} from "./set.interface";

import {
  AlgolSetIfActionElse,
  AlgolSetIfElse,
  AlgolSetIndexList,
  AlgolSetPlayerCase
} from "./set.logical";

export type AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | Layer
  | AlgolSetLayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSingle<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSingles<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetGroupAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetUnion<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIntersect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSubtract<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
