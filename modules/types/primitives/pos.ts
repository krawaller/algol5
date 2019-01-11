import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import {
  SIG_Set,
  SIG_MarkRef,
  SIG_TurnPos,
  SIG_BattlePos,
  SIG_NoArgs
} from "./_signatures";

export type AlgolPos<
  Layer = string,
  Mrk = string,
  Cmnd = string,
  Turnp = string,
  Turnv = string,
  Btlp = string,
  Btlv = string
> =
  | Mrk
  | SIG_NoArgs<"start" | "target">
  | SIG_Set<"onlyin", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_MarkRef<"mark", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_TurnPos<"turnpos", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_BattlePos<"battlepos", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | PosIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | PosPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | PosIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;

interface PosIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfElse<
    AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface PosPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends PlayerCase<
    AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface PosIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfActionElse<
    AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
