import { GeneratorDefAnon } from "./";
import { AlgolBool, AlgolVal, AlgolSet, AlgolMatcher } from "../../";

export type AlgolFilterDefAnon = AlgolFilterDef<
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

export function isAlgolFilterDef(
  gen: GeneratorDefAnon
): gen is AlgolFilterDefAnon {
  return (gen as AlgolFilterDefAnon).type === "filter";
}

export type AlgolFilterDef<
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
