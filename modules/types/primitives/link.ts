import { IfElse, PlayerCase, If } from "./_logical";

export type AlgolLink<
  Layer = string,
  Mrk = string,
  Cmnd = string,
  Turnp = string,
  Turnv = string,
  Btlp = string,
  Btlv = string
> =
  | Mrk
  | Cmnd
  | "endturn"
  | LinkIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | LinkIf<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | LinkPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;

interface LinkIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfElse<
    AlgolLink<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface LinkIf<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends If<
    AlgolLink<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface LinkPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends PlayerCase<
    AlgolLink<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
