import { GeneratorDefAnon } from "./";
import { AlgolBool, AlgolVal, AlgolSet, AlgolMatcher } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolFilterDefAnon = AlgolFilterDef<AlgolGameBlobAnon>;

export function isAlgolFilterDef(
  gen: GeneratorDefAnon
): gen is AlgolFilterDefAnon {
  return (gen as AlgolFilterDefAnon).type === "filter";
}

export type AlgolFilterDef<Blob extends AlgolGameBlobAnon> = {
  type: "filter";
  layer: AlgolSet<Blob>;
  condition?: AlgolBool<Blob>;
  tolayer: AlgolVal<Blob, Blob["artifactLayer"]>;
  matching?: {
    [prop: string]: AlgolMatcher<Blob>;
  };
};
