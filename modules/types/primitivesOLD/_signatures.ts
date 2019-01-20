import { AlgolPos } from "./pos";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";
import { AlgolBool } from "./bool";
import { AlgolNumber } from "./number";

export interface SIG_Set<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_Set_Set<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: never;
}

export interface SIG_Sets<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  5?: never;
}

export interface SIG_LayerRef<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<Layer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<Layer, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_CmndRef<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<Cmnd, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<Cmnd, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_Val_Val<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: never;
}

export interface SIG_Vals<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  5?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  6?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  7?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  8?: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  9?: never;
}

export interface SIG_Set_Pos<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    | _T
    | AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
    | AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: never;
}

export interface SIG_Set_Pos_Val<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Layer,
  Mrk,
  Turnp,
  Turnv
>
  extends Array<
    | _T
    | AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
    | AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
    | AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: never;
}

export interface SIG_Pos<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_Pos_Pos<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: never;
}

export interface SIG_Bools<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  5?: never;
}

export interface SIG_Bool<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_Val<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_Set_Val<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    | _T
    | AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
    | AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: never;
}

export interface SIG_NoArgs<_T> extends Array<_T> {
  0: _T;
  1?: never;
}

export interface SIG_Numbers<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<_T | AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  5?: never;
}

export interface SIG_Number_Number<
  _T,
  Btlp,
  Btlv,
  Cmnd,
  Layer,
  Mrk,
  Turnp,
  Turnv
> extends Array<_T | AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>> {
  0: _T;
  1: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: never;
}

export interface SIG_Literal<_T, T> extends Array<_T | T> {
  0: _T;
  1: T;
  2?: never;
}

export interface SIG_MarkRef<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<Mrk, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<Mrk, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_TurnPos<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<Turnp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<Turnp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_TurnVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<Turnv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<Turnv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_BattlePos<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<Btlp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<Btlp, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}

export interface SIG_BattleVal<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    _T | AlgolVal<Btlv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: _T;
  1: AlgolVal<Btlv, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2?: never;
}
