export * from "./dirs.anon";
export * from "./dirs.interfaces";
export * from "./dirs.guard";

import { AlgolDirsList } from "./dirs.interfaces";

import { AlgolExpression } from "../../";

export type AlgolDirs<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = AlgolExpression<
  AlgolDirsInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

type AlgolDirsInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | ["ortho"]
  | ["diag"]
  | ["rose"]
  | AlgolDirsList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
