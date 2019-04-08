import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import { SIG_Pos, SIG_LayerRef, SIG_Sets } from "./_signatures";

export type AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | Layer
  | SIG_LayerRef<"layer", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Pos<"single" | "groupat", Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SIG_Sets<
      "union" | "intersect" | "subtract",
      Btlp,
      Btlv,
      Cmnd,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | SetIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | SetIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface SetIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface SetPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface SetIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
