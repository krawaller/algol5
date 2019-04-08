import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import {
  SIG_Set_Pos_Val,
  SIG_Literal,
  SIG_NoArgs,
  SIG_Pos,
  SIG_BattleVal,
  SIG_TurnVal
} from "./_signatures";
import { AlgolNumber } from "./number";

export type AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | _T
  | AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Set_Pos_Val<"read", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Literal<"value", _T>
  | SIG_NoArgs<"dir" | "stopreason">
  | SIG_Pos<"idat", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> // TODO - move to id type
  | SIG_BattleVal<
      "battleval" | "battlevar",
      Btlp,
      Btlv,
      Cmnd,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | SIG_TurnVal<
      "turnval" | "turnvar",
      Btlp,
      Btlv,
      Cmnd,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | ValIfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValPlayerCase<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIfActionElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface ValIfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
interface ValPlayerCase<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface ValIfActionElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
