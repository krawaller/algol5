export * from "./dirs.anon";

import { AlgolExpression } from "../../";
import { BasicDir } from "../../gamedef";

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
  AlgolDirsInner,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>;

export type AlgolDirsInner = "ortho" | "diag" | "rose" | BasicDir[];
