export type AlgolAnim<
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Phase extends string,
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
      Phase,
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
  Phase extends string,
  Turnp extends string,
  Turnv extends string,
  Unit extends string
> = {};
