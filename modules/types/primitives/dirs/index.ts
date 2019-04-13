export * from "./dirs.anon";

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

export type AlgolDirsInner =
  | "ortho"
  | "diag"
  | "rose"
  | (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)[];
