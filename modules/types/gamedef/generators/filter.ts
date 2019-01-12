export type FilterDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> = {
  type: "filter";
  layer: any;
  tolayer: ArtifactLayer;
  matching?: any;
};
