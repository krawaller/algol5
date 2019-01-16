import { IfElse, PlayerCase, IfActionElse, If, IfPlayer } from "./_logical";
import { SetPosVal, ValVal } from "./_signatures";
import { AlgolPos } from "./pos";
import { AlgolNumber } from "./number";

export type AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | _T
  | ValValue<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ["dir"]
  | ["stopreason"]
  | ["loopid"]
  | AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValRead<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValBattleVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValTurnVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIdAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValRelDir<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIndexList<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIfActionElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValPlayerCase<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIf<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIfPlayer<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface ValValue<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  value: AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValRead<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  read: SetPosVal<string, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValBattleVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  battlevar: AlgolVal<Btlv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValTurnVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  turnvar: AlgolVal<Turnv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValIdAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  idat: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  pos: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValRelDir<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  reldir: ValVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValIndexList<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  indexlist: AlgolVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
}

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

interface ValIf<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends If<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface ValIfPlayer<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends IfPlayer<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
