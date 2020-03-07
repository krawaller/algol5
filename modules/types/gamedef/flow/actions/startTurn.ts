import { AlgolLink, AlgolGenRef } from "../../../";
import { AlgolGameBlobAnon } from "../../../blob";

export type AlgolStartTurnDef<Blob extends AlgolGameBlobAnon> = {
  link?: AlgolLink<Blob>;
  links?: AlgolLink<Blob>[];
  runGenerator?: AlgolGenRef<Blob>;
  runGenerators?: AlgolGenRef<Blob>[];
};
