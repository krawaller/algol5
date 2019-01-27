import {
  AlgolLogicalIfElse,
  AlgolLogicalIfActionElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIndexList
} from "./logical";
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

// ---------------------------------- Logicals ----------------------------------

interface AlgolSetIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends AlgolLogicalIfElse<
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
  extends AlgolLogicalIfActionElse<
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
  extends AlgolLogicalPlayerCase<
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
  extends AlgolLogicalIndexList<
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

// ---------------------------------- Anon versions ----------------------------------

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

// ---------------------------------- Type guards ----------------------------------

export function isAlgolSetLayer(expr: AlgolSetAnon): expr is AlgolSetLayerAnon {
  return !!(expr as AlgolSetLayerAnon).layer;
}

export function isAlgolSetSingle(
  expr: AlgolSetAnon
): expr is AlgolSetSingleAnon {
  return !!(expr as AlgolSetSingleAnon).single;
}

export function isAlgolSetGroupAt(
  expr: AlgolSetAnon
): expr is AlgolSetGroupAtAnon {
  return !!(expr as AlgolSetGroupAtAnon).groupat;
}

export function isAlgolSetUnion(expr: AlgolSetAnon): expr is AlgolSetUnionAnon {
  return !!(expr as AlgolSetUnionAnon).union;
}

export function isAlgolSetIntersect(
  expr: AlgolSetAnon
): expr is AlgolSetIntersectAnon {
  return !!(expr as AlgolSetIntersectAnon).intersect;
}

export function isAlgolSetSubtract(
  expr: AlgolSetAnon
): expr is AlgolSetSubtractAnon {
  return !!(expr as AlgolSetSubtractAnon).subtract;
}
