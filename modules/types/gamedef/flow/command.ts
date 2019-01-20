import { AlgolVal } from "../../";
import { AlgolEffect } from "../../";

export type CommandDef<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv,
  Unit
> = {
  nodeadends?: boolean;
  applyEffects?: AlgolEffect<
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv,
    Unit
  >[];
  applyEffect?: AlgolEffect<
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv,
    Unit
  >;
  link?: AlgolVal<
    Cmnd | Mrk | "endturn",
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  links?: AlgolVal<
    Cmnd | Mrk | "endturn",
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
  runGenerator?: AlgolVal<
    Gen,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  runGenerators?: AlgolVal<
    Gen,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
};
