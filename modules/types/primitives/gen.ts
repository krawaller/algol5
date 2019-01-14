import { IfElse, PlayerCase, If, IfActionElse } from "./_logical";

export type AlgolGen<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv> =
  | Gen
  | GenIfElse<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  | GenIf<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  | GenPlayerCase<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  | GenIfActionElse<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>;

interface GenIfElse<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolGen<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface GenIf<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  extends If<
    AlgolGen<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface GenPlayerCase<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolGen<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface GenIfActionElse<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolGen<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
