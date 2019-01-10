import { AlgolBool } from "./bool";

export type Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv> =
  | T
  | IfElse<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  | PlayerCase<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;

export interface IfElse<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    | "ifelse"
    | AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
    | Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: "ifelse";
  1: AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3: Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  4?: never;
}

export interface If<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    | "if"
    | AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
    | Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: "if";
  1: AlgolBool<Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  4?: never;
}

export interface PlayerCase<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  extends Array<
    "playercase" | Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>
  > {
  0: "playercase";
  1: Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  2: Logical<T, Layer, Mrk, Cmnd, Turnp, Turnv, Btlp, Btlv>;
  3?: never;
}
