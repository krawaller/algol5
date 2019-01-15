import { IfElse, IfActionElse, PlayerCase } from "./_logical";
import { AlgolVal } from "./value";

export type AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | Layer
  | SetLayer<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetSingle<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetGroupAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetUnion<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetIntersect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetSubtract<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface SetLayer<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  layer: AlgolVal<Layer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface SetSingle<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  single: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface SetGroupAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  groupat: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface SetUnion<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  union: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

interface SetIntersect<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  intersect: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

interface SetSubtract<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  subtract: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

interface SetIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface SetIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface SetPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
