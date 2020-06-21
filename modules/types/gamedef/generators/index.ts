import { WalkerDef } from "./walker";
import { NeighbourDef } from "./neighbour";
import { AlgolFilterDef } from "./filter";
import { AlgolGameBlobAnon } from "../../blob";
import { AlgolFloaterDef } from "./floater";

export * from "./walker";
export * from "./neighbour";
export * from "./filter";
export * from "./draw";
export * from "./floater";

export type Generators<Blob extends AlgolGameBlobAnon> = {
  [genname in Blob["gen"]]: GeneratorDef<Blob>;
};

export type GeneratorDef<Blob extends AlgolGameBlobAnon> =
  | WalkerDef<Blob>
  | NeighbourDef<Blob>
  | AlgolFilterDef<Blob>
  | AlgolFloaterDef<Blob>;

export type GeneratorsAnon = Generators<AlgolGameBlobAnon>;

export type GeneratorDefAnon = GeneratorDef<AlgolGameBlobAnon>;
