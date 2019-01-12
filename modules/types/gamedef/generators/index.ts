import { WalkerDef } from "./walker";
import { NeighbourDef } from "./neighbour";
import { FilterDef } from "./filter";

export type WalkerDef = WalkerDef;
export type NeighbourDef = NeighbourDef;
export type FilterDef = FilterDef;

export type Generators<
  ArtifactLayer extends string = string,
  GeneratorName extends string = string,
  Layer extends string = string
> = { [genname in GeneratorName]: GeneratorDef<ArtifactLayer, Layer> };

export type GeneratorDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> =
  | WalkerDef<ArtifactLayer, Layer>
  | NeighbourDef<ArtifactLayer, Layer>
  | FilterDef<ArtifactLayer, Layer>;
