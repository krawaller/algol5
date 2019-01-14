import { DrawDef } from "./draw";

export type WalkerDef<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
  Layer,
  Mark,
  TurnPos,
  TurnVar
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
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
    steps?: DrawDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
    block?: DrawDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
    last?: DrawDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
    all?: DrawDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
    count?: DrawDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
  };
};
