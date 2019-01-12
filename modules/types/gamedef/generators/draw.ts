export type DrawDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> = {
  tolayer: any;
  include?: any;
  condition?: any;
  ifover?: any;
  unlessover?: any;
};
