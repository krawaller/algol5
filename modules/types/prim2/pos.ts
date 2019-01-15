import { IfElse, IfActionElse, PlayerCase } from "./_logical";
import { AlgolVal } from "./value";
import { AlgolSet } from "./set";

export type AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | Mrk
  | ["start"]
  | ["target"]
  | PosMark<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosOnlyIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosBattlePos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosTurnPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface PosMark<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  mark: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface PosBattlePos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  battlepos: AlgolVal<Btlp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface PosTurnPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  turnpos: AlgolVal<Turnp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface PosOnlyIn<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  onlyin: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface PosIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface PosIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface PosPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
