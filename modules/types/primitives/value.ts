import { IfElse, PlayerCase, IfActionElse, If, IfPlayer } from "./_logical";
import { SetPosVal, ValVal, SetVal } from "./_signatures";
import { AlgolPos } from "./pos";
import { AlgolSet } from "./set";

export type AlgolValAnon = AlgolVal<
  string | number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | _T
  | ValValue<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ["dir"]
  | ["stopreason"]
  | ["loopid"]
  | ["player"]
  | ["otherplayer"]
  | ["turn"]
  | ["totalcount"]
  | ["neighbourcount"]
  | ["walklength"]
  | ["max"]
  | ["step"]
  | ValRead<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValBattleVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValTurnVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValIdAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValRelDir<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValGridAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValGridIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValSizeOf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValHarvest<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValSum<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValProd<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValMinus<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValIfElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValIfActionElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValPlayerCase<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValIf<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | ValIfPlayer<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;

interface ValValue<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  value: AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface ValRead<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  read: SetPosVal<string, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface ValBattleVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  battlevar: AlgolVal<Btlv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface ValTurnVar<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  turnvar: AlgolVal<Turnv, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface ValIdAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  idat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface ValPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  pos: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface ValRelDir<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  reldir: ValVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface ValIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  indexlist: AlgolVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
}

interface ValGridIn<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  gridin: [
    AlgolVal<Grid, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface ValGridAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  gridat: [
    AlgolVal<Grid, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  ];
}

interface ValSizeOf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  sizeof: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface ValHarvest<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  harvest: SetVal<
    string | number,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
}

interface ValSum<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  sum: AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface ValProd<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  prod: AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface ValMinus<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  minus: AlgolVal<number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>[];
}

interface ValIfElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends IfElse<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface ValIfActionElse<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends IfActionElse<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface ValPlayerCase<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends PlayerCase<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface ValIf<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends If<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface ValIfPlayer<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  extends IfPlayer<
    AlgolVal<_T, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
