import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import {
  SIG_Set,
  SIG_MarkRef,
  SIG_TurnPos,
  SIG_BattlePos,
  SIG_NoArgs
} from "./_signatures";

export type AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | Mrk
  | SIG_NoArgs<"start" | "target">
  | SIG_Set<"onlyin", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_MarkRef<"mark", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_TurnPos<"turnpos", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_BattlePos<"battlepos", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PosIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

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
