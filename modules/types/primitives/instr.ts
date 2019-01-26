import {
  AlgolLogicalIfElse,
  AlgolLogicalIfActionElse,
  AlgolLogicalPlayerCase,
  AlgolLogicalIfPlayer,
  AlgolLogicalIf,
  AlgolLogicalIndexList
} from "./logical";
import { PosPos, SetSet, SetPos, ValVal } from "./_signatures";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";
import { AlgolPos } from "./pos";

export type AlgolInstrAnon = AlgolInstr<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type AlgolInstr<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> =
  | string
  | Cmnd
  | Unit
  | InstrVal<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | InstrPluralize<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | InstrNameAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | InstrLine<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrOrList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIfActionElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIfPlayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrPlayerCase<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIndexList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>;

interface InstrPluralize<
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

interface InstrVal<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
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

interface InstrNameAt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  nameat: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface InstrPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> {
  pos: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
}

interface InstrOrList<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit> {
  orlist: AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}

interface InstrLine<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit> {
  line: AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>[];
}

interface InstrIfPlayer<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  extends AlgolLogicalIfPlayer<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrIf<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  extends AlgolLogicalIf<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrIfElse<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>
  extends AlgolLogicalIfElse<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrIfActionElse<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalIfActionElse<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrPlayerCase<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalPlayerCase<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrIndexList<
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
>
  extends AlgolLogicalIndexList<
    AlgolInstr<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}
