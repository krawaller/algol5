import { AlgolInstr } from "../";

export type Instructions<
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
> = {
  [phase in Phase]: AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
};
