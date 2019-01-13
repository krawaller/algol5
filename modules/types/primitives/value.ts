import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import { SIG_Set_Pos_Val, SIG_Literal, SIG_NoArgs } from "./_signatures";
import { AlgolNumber } from "./number";

export type AlgolVal<
  Layer = string,
  Mrk = string,
  Cmnd = string,
  Turnp = string,
  Turnv = string,
  Btlp = string,
  Btlv = string,
  T = string | number
> =
  | T
  | AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Set_Pos_Val<"read", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Literal<"value", T>
  | SIG_NoArgs<"dir" | "stopreason">
  | ValIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>
  | ValPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>
  | ValIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>;

interface ValIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>
  extends IfElse<
    AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
interface ValPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>
  extends PlayerCase<
    AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface ValIfActionElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>
  extends IfActionElse<
    AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, T>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
