import { IfElse, PlayerCase, If } from "./_logical";

export type AlgolGen<
  Layer = string,
  Mrk = string,
  Cmnd = string,
  Turnp = string,
  Turnv = string,
  Btlp = string,
  Btlv = string,
  Gen = string
> =
  | Gen
  | GenIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>
  | GenIf<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>
  | GenPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>;

interface GenIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>
  extends IfElse<
    AlgolGen<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface GenIf<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>
  extends If<
    AlgolGen<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface GenPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>
  extends PlayerCase<
    AlgolGen<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Gen>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
