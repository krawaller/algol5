import { AlgolDirs } from "./";

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
  dirslist: AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}
