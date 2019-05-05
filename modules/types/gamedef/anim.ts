import { AlgolPos } from "../";

export type AlgolAnim<
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string,
  Unit extends string
> = Partial<
  {
    [cmnd in Cmnd]: AlgolAnimCmnd<
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
  }
>;

export type AlgolAnimCmnd<
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string,
  Unit extends string
> = Partial<{
  enterFrom: Partial<
    {
      [p in IsAString<
        AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
      >]: AlgolPos<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
    }
  >;
}>;

type IsAString<T> = string;
