import { WalkerDef } from "./walker";
import { NeighbourDef } from "./neighbour";
import { FilterDef } from "./filter";

export * from "./walker";
export * from "./neighbour";
export * from "./filter";

export type Generators<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
  Generator extends string,
  Layer,
  Mark,
  TurnPos,
  TurnVar
> = {
  [genname in Generator]: GeneratorDef<
    ArtifactLayer,
    BattlePos,
    BattleVar,
    Command,
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >
};

export type GeneratorDef<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
  Layer,
  Mark,
  TurnPos,
  TurnVar
> =
  | WalkerDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >
  | NeighbourDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >
  | FilterDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
