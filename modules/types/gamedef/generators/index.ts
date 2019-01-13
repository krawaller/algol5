import { WalkerDef } from "./walker";
import { NeighbourDef } from "./neighbour";
import { FilterDef } from "./filter";

export type WalkerDef = WalkerDef;
export type NeighbourDef = NeighbourDef;
export type FilterDef = FilterDef;

export type Generators<
  Layer extends string = string,
  Mark extends string = string,
  Command extends string = string,
  TurnPos extends string = string,
  TurnVar extends string = string,
  BattlePos extends string = string,
  BattleVar extends string = string,
  ArtifactLayer extends string = string,
  Generator extends string = string
> = {
  [genname in Generator]: GeneratorDef<
    Layer,
    Mark,
    Command,
    TurnPos,
    TurnVar,
    BattlePos,
    BattleVar,
    ArtifactLayer
  >
};

export type GeneratorDef<
  Layer extends string = string,
  Mark extends string = string,
  Command extends string = string,
  TurnPos extends string = string,
  TurnVar extends string = string,
  BattlePos extends string = string,
  BattleVar extends string = string,
  ArtifactLayer extends string = string
> =
  | WalkerDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >
  | NeighbourDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >
  | FilterDef<
      Layer,
      Mark,
      Command,
      TurnPos,
      TurnVar,
      BattlePos,
      BattleVar,
      ArtifactLayer
    >;
