import { IfElse, IfActionElse, PlayerCase } from "./_logical";
import { SetVal } from "./_signatures";
import { AlgolVal } from "./value";
import { AlgolSet } from "./set";

export type AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | number
  | ["player"]
  | ["otherplayer"]
  | ["turn"]
  | ["totalcount"]
  | ["neighbourcount"]
  | ["walklength"]
  | ["max"]
  | ["step"]
  | NumberSizeOf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberHarvest<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberSum<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberProd<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberMinus<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | NumberPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface NumberSizeOf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  sizeof: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface NumberHarvest<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  harvest: SetVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface NumberSum<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  sum: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

interface NumberProd<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  prod: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

interface NumberMinus<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  minus: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
}

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
