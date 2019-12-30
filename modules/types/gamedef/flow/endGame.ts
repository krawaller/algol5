import { AlgolSet, AlgolBool, AlgolVal } from "../../";

export type EndGameDef<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> = {
  show?: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  condition: AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  who?: AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  unlessAction?: Cmnd;
  ifPlayer?: 1 | 2;
  whenStarvation?: boolean;
};
