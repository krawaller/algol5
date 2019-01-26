import {
  AlgolLogicalIfElse,
  AlgolLogicalIfActionElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIf,
  AlgolLogicalIndexList
} from "./logical";
import { AlgolVal } from "./value";

export type AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | ["ortho"]
  | ["diag"]
  | ["rose"]
  | DirsList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | DirsIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | DirsIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | DirsIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | DirsPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | DirsIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

interface DirsList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  list: (
    | AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
    | AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>)[];
}

interface DirsIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIfElse<
    AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface DirsIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIf<
    AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface DirsIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIfActionElse<
    AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface DirsPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalPlayerCase<
    AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface DirsIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIndexList<
    AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
