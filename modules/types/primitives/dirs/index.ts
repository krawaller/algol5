export * from "./dirs.anon";

import { AlgolExpression } from "../../";
import { BasicDir } from "../../gamedef";
import { AlgolDirsList } from "./dirs.interfaces";

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

export type AlgolDirsInner<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | "ortho"
  | "diag"
  | "rose"
  | "knight"
  | BasicDir[]
  | AlgolDirsList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
