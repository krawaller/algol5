import { DrawDef } from "./draw";

export type NeighbourDef<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
  Layer,
  Mark,
  TurnPos,
  TurnVar
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
    neighbours?: DrawDef<
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
