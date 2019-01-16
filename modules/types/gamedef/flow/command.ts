import { AlgolVal } from "../../";

export type CommandDef<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv> = {
  nodeadends?: boolean;
  applyEffects?: any;
  applyEffect?: any;
  link?: AlgolVal<
    Cmnd | Mrk | "endturn",
    Btlp,
    Btlv,
    Cmnd,
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
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
  runGenerator?: AlgolVal<Gen, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  runGenerators?: AlgolVal<Gen, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
};
