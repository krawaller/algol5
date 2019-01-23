import { IfElse, IfActionElse, PlayerCase } from "./_logical";
import { AlgolVal } from "./value";
import { AlgolSet } from "./set";

export type AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | Mrk
  | ["start"]
  | ["target"]
  | AlgolPosMark<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosOnlyIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolPosPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

interface AlgolPosMark<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  mark: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolPosBattlePos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  battlepos: AlgolVal<Btlp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolPosTurnPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  turnpos: AlgolVal<Turnp, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolPosOnlyIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  onlyin: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolPosIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolPosIfActionElse<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
>
  extends IfActionElse<
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolPosPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

// -------

export type AlgolPosAnon = AlgolPos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolPosMarkAnon = AlgolPosMark<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosOnlyInAnon = AlgolPosOnlyIn<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosBattlePosAnon = AlgolPosBattlePos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosTurnPosAnon = AlgolPosTurnPos<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosIfElseAnon = AlgolPosIfElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosIfActionElseAnon = AlgolPosIfActionElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolPosPlayerCaseAnon = AlgolPosPlayerCase<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
