import { GeneratorDefAnon } from "./";
import { AlgolBool, AlgolVal } from "../../";

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

export function isFilterDef(gen: GeneratorDefAnon) {
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
  layer: any;
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
  matching?: any;
};
