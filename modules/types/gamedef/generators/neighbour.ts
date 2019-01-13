import { DrawDef } from "./draw";

export type NeighbourDef<
  Layer extends string = string,
  Mark extends string = string,
  Command extends string = string,
  TurnPos extends string = string,
  TurnVar extends string = string,
  BattlePos extends string = string,
  BattleVar extends string = string,
  ArtifactLayer extends string = string
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
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
    neighbours?: DrawDef<
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
