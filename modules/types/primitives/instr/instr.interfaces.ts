import { AlgolInstr } from "./";

import { AlgolVal } from "../value";
import { AlgolPos } from "../pos";

export interface AlgolInstrPluralize<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  pluralize: [
    AlgolVal<string | number, Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>,
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

export interface AlgolInstrVal<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  value: AlgolVal<
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

export interface AlgolInstrNameAt<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  nameat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolInstrPos<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> {
  pos: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

export interface AlgolInstrOrList<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  orlist: AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}

export interface AlgolInstrLine<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> {
  line: AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}
