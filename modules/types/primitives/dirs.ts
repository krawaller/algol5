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
  | AlgolDirsList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolDirsIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

interface AlgolDirsList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  list: (
    | AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
    | AlgolDirs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>)[];
}

// ---------------------------------- Logicals ----------------------------------

interface AlgolDirsIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
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

interface AlgolDirsIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
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

interface AlgolDirsIfActionElse<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>
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

interface AlgolDirsPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
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

interface AlgolDirsIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
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

// ---------------------------------- Anon versions ----------------------------------

export type AlgolDirsAnon = AlgolDirs<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolDirsListAnon = AlgolDirsList<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolDirsIfAnon = AlgolDirsIf<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolDirsIfElseAnon = AlgolDirsIfElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolDirsIfActionElseAnon = AlgolDirsIfActionElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolDirsPlayerCaseAnon = AlgolDirsPlayerCase<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolDirsIndexListAnon = AlgolDirsIndexList<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

// ---------------------------------- Type Guards ----------------------------------

export function isAlgolDirsList(
  expr: AlgolDirsAnon
): expr is AlgolDirsListAnon {
  return !!(expr as AlgolDirsListAnon).list;
}
