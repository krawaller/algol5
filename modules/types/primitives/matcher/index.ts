import { AlgolMatcherIs, AlgolMatcherIsnt } from "./matcher.interfaces";

export * from "./matcher.anon";
export * from "./matcher.interfaces";
export * from "./matcher.guard";

export type AlgolMatcher<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv> =
  | AlgolMatcherIs<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>
  | AlgolMatcherIsnt<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
