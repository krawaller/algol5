import { AlgolPos } from "./pos";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";
import { AlgolBool } from "./bool";
import { AlgolNumber } from "./number";

export interface SIG_Set<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2?: never;
}

export interface SIG_Set_Set<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: never;
}

export interface SIG_Sets<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  4?: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  5?: never;
}

export interface SIG_LayerRef<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Layer>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Layer>;
  2?: never;
}

export interface SIG_CmndRef<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  2?: never;
}

export interface SIG_Val_Val<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  2: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  3?: never;
}

export interface SIG_Vals<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  2: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  3?: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  4?: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  5?: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  6?: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  7?: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  8?: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Cmnd>;
  9?: never
}

export interface SIG_Set_Pos<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    | CMND
    | AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
    | AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: CMND;
  1: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: never;
}

export interface SIG_Set_Pos_Val<
  CMND,
  Layer,
  Mrk,
  Cmnd,
  Turnp,
  Turnv,
  Btlp,
  Btlv
>
  extends Array<
    | CMND
    | AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
    | AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
    | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: CMND;
  1: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  4?: never;
}

export interface SIG_Pos<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2?: never;
}

export interface SIG_Pos_Pos<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolPos<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: never;
}

export interface SIG_Bools<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  4?: AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  5?: never;
}

export interface SIG_Bool<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2?: never;
}

export interface SIG_Val<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>> {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2?: never;
}

export interface SIG_Set_Val<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    | CMND
    | AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
    | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: CMND;
  1: AlgolSet<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: never;
}

export interface SIG_NoArgs<CMND> extends Array<CMND> {
  0: CMND;
  1?: never;
}

export interface SIG_Numbers<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: CMND;
  1: AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  4?: AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  5?: never;
}

export interface SIG_Number_Number<
  CMND,
  Layer,
  Mrk,
  Cmnd,
  Turnp,
  Turnv,
  Btlp,
  Btlv
>
  extends Array<
    CMND | AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: CMND;
  1: AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: AlgolNumber<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: never;
}

export interface SIG_Literal<CMND, T> extends Array<CMND | T> {
  0: CMND;
  1: T;
  2?: never;
}

export interface SIG_MarkRef<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Mrk>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Mrk>;
  2?: never;
}

export interface SIG_TurnPos<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Turnp>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Turnp>;
  2?: never;
}

export interface SIG_TurnVal<CMND, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Turnv>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Turnv>;
  2?: never;
}

export interface SIG_BattlePos<
  CMND,
  Layer,
  Mrk,
  Cmnd,
  Turnp,
  Turnv,
  Btlp,
  Btlv
>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Btlp>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Btlp>;
  2?: never;
}

export interface SIG_BattleVal<
  CMND,
  Layer,
  Mrk,
  Cmnd,
  Turnp,
  Turnv,
  Btlp,
  Btlv
>
  extends Array<
    CMND | AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Btlv>
  > {
  0: CMND;
  1: AlgolVal<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv, Btlv>;
  2?: never;
}
