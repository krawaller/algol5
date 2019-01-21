import { AlgolVal, Partial } from "../../";

export type Brain<
  AiAspect extends string,
  AiGenerator extends string,
  Btlp extends string,
  Btlv extends string,
  Cmnd extends string,
  Grid extends string,
  Layer extends string,
  Mrk extends string,
  Turnp extends string,
  Turnv extends string
> = {
  generators?: AlgolVal<
    AiGenerator,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
  plus: Partial<
    {
      [a in AiAspect]: AlgolVal<
        number,
        Btlp,
        Btlv,
        Cmnd,
        Grid,
        Layer,
        Mrk,
        Turnp,
        Turnv
      >
    }
  >;
  minus: Partial<
    {
      [a in AiAspect]: AlgolVal<
        number,
        Btlp,
        Btlv,
        Cmnd,
        Grid,
        Layer,
        Mrk,
        Turnp,
        Turnv
      >
    }
  >;
};
