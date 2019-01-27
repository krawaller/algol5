import { AlgolDirs } from "./";

import { AlgolVal } from "../value";

export interface AlgolDirsList<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  list: (
    | AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
    | AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>)[];
}
