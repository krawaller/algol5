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
    start?: DrawDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
    steps?: DrawDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
    block?: DrawDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
    last?: DrawDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
    all?: DrawDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
    count?: DrawDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
  };
};
