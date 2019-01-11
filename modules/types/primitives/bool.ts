import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import {
  SIG_Set,
  SIG_Sets,
  SIG_Set_Pos,
  SIG_Pos_Pos,
  SIG_Bool,
  SIG_Val,
  SIG_Bools,
  SIG_NoArgs,
  SIG_CmndRef,
  SIG_MarkRef,
  SIG_Val_Val,
  SIG_Number_Number,
  SIG_Vals
} from "./_signatures";

export type AlgolBool<
  Layer = string,
  Mrk = string,
  Cmnd = string,
  Turnp = string,
  Turnv = string,
  Btlp = string,
  Btlv = string
> =
  | SIG_Bools<"and" | "or", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Pos_Pos<
      "samepos" | "higher" | "further",
      Layer,
      Mrk,
      Cmnd,
      Turnp,
      Turnv,
      Btlp,
      Btlv
    >
  | SIG_Set<"isempty" | "notempty", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Sets<"overlaps", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Set_Pos<"anyat" | "noneat", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Number_Number<"morethan", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Bool<"not", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Val<"truthy" | "falsy", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Vals<"valinlist", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Val_Val<
      "same" | "different",
      Layer,
      Mrk,
      Cmnd,
      Turnp,
      Turnv,
      Btlp,
      Btlv
    >
  | SIG_CmndRef<"cmndavailable", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_MarkRef<"markavailable", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_NoArgs<"true" | "false">
  | BoolIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | BoolPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | BoolIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;

interface BoolIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfElse<
    AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
interface BoolPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends PlayerCase<
    AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface BoolIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfActionElse<
    AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
