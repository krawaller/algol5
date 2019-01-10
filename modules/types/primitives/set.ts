import { IfElse, PlayerCase } from "./_logical";
import { SIG_Pos, SIG_LayerRef, SIG_Sets } from "./_signatures";

export type AlgolSet<
  Layer = string,
  Mrk = string,
  Cmnd = string,
  Turnp = string,
  Turnv = string,
  Btlp = string,
  Btlv = string
> =
  | Layer
  | SIG_LayerRef<"layer", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Pos<"single" | "groupat", Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SIG_Sets<
      "union" | "intersect" | "subtract",
      Layer,
      Mrk,
      Cmnd,
      Turnp,
      Turnv,
      Btlp,
      Btlv
    >
  | SetIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | SetPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;

interface SetIfElse<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends IfElse<
    AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}

interface SetPlayerCase<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends PlayerCase<
    AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>,
    Layer,
    Mrk,
    Cmnd,
    Turnp,
    Turnv,
    Btlp,
    Btlv
  > {}
