import { WalkerDef } from "./walker";
import { NeighbourDef } from "./neighbour";
import { AlgolFilterDef } from "./filter";

export * from "./walker";
export * from "./neighbour";
export * from "./filter";
export * from "./draw";

export type Generators<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
  Generator extends string,
  Grid,
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
    Grid,
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
  Grid,
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
      Grid,
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
      Grid,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >
  | AlgolFilterDef<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Grid,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;

// ----------------------- Anon variants

export type GeneratorsAnon = Generators<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;

export type GeneratorDefAnon = GeneratorDef<
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
>;
