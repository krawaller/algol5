import { AlgolBool } from "./bool";
import { AlgolVal } from "./value";

export type Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> =
  | _T
  | IfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | PlayerCase<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | IfActionElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;

export interface IfElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    | "ifelse"
    | AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
    | Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: "ifelse";
  1: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3: Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: never;
}

export interface If<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    | "if"
    | AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
    | Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: "if";
  1: AlgolBool<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: never;
}

export interface PlayerCase<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    "playercase" | Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: "playercase";
  1: Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3?: never;
}

export interface IfActionElse<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  extends Array<
    | "ifactionelse"
    | Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
    | AlgolVal<"start" | Mrk | Cmnd, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  > {
  0: "ifactionelse";
  1: AlgolVal<"start" | Mrk | Cmnd, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  2: Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  3: Logical<_T, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  4?: never;
}
