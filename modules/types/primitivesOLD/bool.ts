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

export type AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | SIG_Bools<"and" | "or", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Pos_Pos<
      "samepos" | "higher" | "further",
      Btlp,
      Btlv,
      Cmnd,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | SIG_Set<"isempty" | "notempty", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Sets<"overlaps", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Set_Pos<"anyat" | "noneat", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Number_Number<"morethan", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Bool<"not", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Val<"truthy" | "falsy", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Vals<"valinlist", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Val_Val<
      "same" | "different",
      Btlp,
      Btlv,
      Cmnd,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | SIG_CmndRef<"cmndavailable", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_MarkRef<"markavailable", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_NoArgs<"true" | "false">
  | BoolIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | BoolIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface BoolIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
interface BoolPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface BoolIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
