import { AlgolSet, AlgolBool, AlgolVal } from "../../";

export type EndGameDef<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> = {
  show?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  condition: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  who?: AlgolVal<0 | 1 | 2, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
};
