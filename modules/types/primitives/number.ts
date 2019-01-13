import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import {
  SIG_Set,
  SIG_NoArgs,
  SIG_Set_Val,
  SIG_Numbers,
  SIG_Number_Number,
  SIG_Literal
} from "./_signatures";

export type AlgolNumber<
  Layer = string,
  Mrk = string,
  Cmnd = string,
  Turnp = string,
  Turnv = string,
  Btlp = string,
  Btlv = string
> =
  | number
  | SIG_NoArgs<
      | "player"
      | "otherplayer"
      | "turn"
      | "totalcount"
      | "neighbourcount"
      | "walklength"
      | "max"
      | "step"
    >
  | SIG_Literal<"value", number>
  | SIG_Number_Number<"minus", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Numbers<"prod" | "sum", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Set_Val<"harvest", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Set<"sizeof", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | NumberIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | NumberPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | NumberIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;

interface NumberIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfElse<
    AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
interface NumberPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends PlayerCase<
    AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface NumberIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfActionElse<
    AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
