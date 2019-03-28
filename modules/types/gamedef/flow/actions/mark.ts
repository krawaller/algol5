import { AlgolSet } from "../../../";
import { AlgolActionDef } from "./action";

export type AlgolMarkDef<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = AlgolActionDef<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv> & {
  from: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
};
