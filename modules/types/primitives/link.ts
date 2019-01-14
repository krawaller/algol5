import { IfElse, PlayerCase, If, IfActionElse } from "./_logical";

export type AlgolLink<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | Mrk
  | Cmnd
  | "endturn"
  | LinkIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | LinkIf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | LinkPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | LinkIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface LinkIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolLink<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface LinkIf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends If<
    AlgolLink<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface LinkPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolLink<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface LinkIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolLink<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
