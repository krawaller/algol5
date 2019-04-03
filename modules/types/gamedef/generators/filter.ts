import { GeneratorDefAnon } from "./";
import { AlgolBool, AlgolVal, AlgolSet, AlgolMatcher } from "../../";

export type FilterDefAnon = FilterDef<
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

export function isFilterDef(gen: GeneratorDefAnon): gen is FilterDefAnon {
  return (gen as FilterDefAnon).type === "filter";
}

export type FilterDef<
  ArtifactLayer,
  Btlp,
  Btlv,
  Cmnd,
  Grid,
  Layer,
  Mrk,
  Turnp,
  Turnv
> = {
  type: "filter";
  layer: AlgolSet<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  condition?: AlgolBool<Btlp, Btlv, Cmnd, Grid, Layer, Mrk, Turnp, Turnv>;
  tolayer: AlgolVal<
    ArtifactLayer,
    Btlp,
    Btlv,
    Cmnd,
    Grid,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  matching?: {
    [prop: string]: AlgolMatcher<
      Btlp,
      Btlv,
      Cmnd,
      Grid,
      Layer,
      Mrk,
      Turnp,
      Turnv
    >;
  };
};
