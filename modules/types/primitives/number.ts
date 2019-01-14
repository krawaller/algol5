import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import {
  SIG_Set,
  SIG_NoArgs,
  SIG_Set_Val,
  SIG_Numbers,
  SIG_Number_Number,
  SIG_Literal
} from "./_signatures";

export type AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
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
  | SIG_Number_Number<"minus", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Numbers<"prod" | "sum", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Set_Val<"harvest", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Set<"sizeof", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface NumberIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
interface NumberPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface NumberIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
