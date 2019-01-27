export * from "./dirs.anon";
export * from "./dirs.interfaces";
export * from "./dirs.logical";
export * from "./dirs.guard";

import {
  AlgolDirsIf,
  AlgolDirsIfActionElse,
  AlgolDirsIfElse,
  AlgolDirsIndexList,
  AlgolDirsPlayerCase
} from "./dirs.logical";

import { AlgolDirsList } from "./dirs.interfaces";

export type AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | ["ortho"]
  | ["diag"]
  | ["rose"]
  | AlgolDirsList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
