import { DrawDef } from "./draw";

export type WalkerDef<
  Layer extends string = string,
  Mark extends string = string,
  Command extends string = string,
  TurnPos extends string = string,
  TurnVar extends string = string,
  BattlePos extends string = string,
  BattleVar extends string = string,
  ArtifactLayer extends string = string
> = {
  type: "walker";
  dir?: any;
  dirs?: any;
  start?: any;
  starts?: any;
  steps?: any;
  testblocksbeforesteps?: boolean;
  blocks?: any;
  count?: any;
  startasstep?: boolean;
  max?: any;
  draw: {
    start?: DrawDef<ArtifactLayer, Layer>;
    steps?: DrawDef<ArtifactLayer, Layer>;
    block?: DrawDef<ArtifactLayer, Layer>;
    last?: DrawDef<ArtifactLayer, Layer>;
    all?: DrawDef<ArtifactLayer, Layer>;
    count?: DrawDef<ArtifactLayer, Layer>;
  };
};
