import { IfElse, PlayerCase, IfActionElse } from "./_logical";
import { SetPosVal } from "./_signatures";
import { AlgolPos } from "./pos";

export type AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | _T
  | ValValue<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ["dir"]
  | ["stopreason"]
  | ValRead<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValBattleVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIdAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValIfActionElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | ValPlayerCase<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

interface ValValue<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  value: AlgolVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValRead<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  read: SetPosVal<string, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValBattleVar<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  battlevar: AlgolVal<Btlv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface ValIdAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  idat: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
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
