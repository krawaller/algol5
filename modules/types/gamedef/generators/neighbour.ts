import { DrawDef } from "./draw";

export type NeighbourDef<
  ArtifactLayer extends string = string,
  Layer extends string = string
> = {
  type: "neighbour";
  dir?: any;
  dirs?: any;
  start?: any;
  starts?: any;
  condition?: any;
  ifover?: any;
  unlessover?: any;
  draw: {
    start?: DrawDef<ArtifactLayer, Layer>;
    neighbours?: DrawDef<ArtifactLayer, Layer>;
  };
};
