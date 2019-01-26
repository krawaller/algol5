import { IfElse, IfActionElse, PlayerCase, IndexList } from "./_logical";
import { AlgolVal } from "./value";
import { AlgolPos } from "./pos";

export type AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | Layer
  | AlgolSetLayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSingle<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetGroupAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetUnion<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIntersect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetSubtract<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolSetIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

interface AlgolSetLayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  layer: AlgolVal<Layer, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolSetSingle<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  single: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolSetGroupAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  groupat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface AlgolSetUnion<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  union: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface AlgolSetIntersect<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  intersect: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface AlgolSetSubtract<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  subtract: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface AlgolSetIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolSetIfActionElse<
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
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolSetPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface AlgolSetIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends IndexList<
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

// --------------------- Anon versions

export type AlgolSetAnon = AlgolSet<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolSetLayerAnon = AlgolSetLayer<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetSingleAnon = AlgolSetSingle<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetGroupAtAnon = AlgolSetGroupAt<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetUnionAnon = AlgolSetUnion<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetIntersectAnon = AlgolSetIntersect<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetSubtractAnon = AlgolSetSubtract<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetIfElseAnon = AlgolSetIfElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetIfActionElseAnon = AlgolSetIfActionElse<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetPlayerCaseAnon = AlgolSetPlayerCase<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
export type AlgolSetIndexListAnon = AlgolSetIndexList<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
