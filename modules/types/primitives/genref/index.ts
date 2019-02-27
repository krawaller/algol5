export * from "./genref.anon";
export * from "./genref.logical";

import {
  AlgolGenRefIf,
  AlgolGenRefIfPlayer,
  AlgolGenRefIfAction,
  AlgolGenRefIfActionElse,
  AlgolGenRefIfElse,
  AlgolGenRefIndexList,
  AlgolGenRefPlayerCase,
  AlgolGenRefMulti
} from "./genref.logical";

export type AlgolGenRef<
  Btlp,
  Btlv,
  Cmnd,
  Gen,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> =
  | Gen
  | AlgolGenRefMulti<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolGenRefIf<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolGenRefIfPlayer<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolGenRefIfAction<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolGenRefIfElse<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolGenRefIfActionElse<
      Btlp,
      Btlv,
      Cmnd,
      Gen,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >
  | AlgolGenRefPlayerCase<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolGenRefIndexList<Btlp, Btlv, Cmnd, Gen, Grid, Layer, Mrk, Turnp, Turnv>;
