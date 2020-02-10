import { AlgolVal, AlgolBool, AlgolSet } from "../../";

export type DrawDefAnon = DrawDefInner<
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

export type DrawDef<
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
  | DrawDefInner<
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
  | DrawDefInner<
      ArtifactLayer,
      BattlePos,
      BattleVar,
      Command,
      Grid,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >[];

export type DrawDefInner<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
  Grid,
  Layer,
  Mark,
  TurnPos,
  TurnVar
> = {
  tolayer: AlgolVal<
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
  include?: {
    [idx: string]: AlgolVal<
      string | number,
      BattlePos,
      BattleVar,
      Command,
      Grid,
      Layer,
      Mark,
      TurnPos,
      TurnVar
    >;
  };
  condition?: AlgolBool<
    BattlePos,
    BattleVar,
    Command,
    Grid,
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
  ifover?: AlgolSet<
    BattlePos,
    BattleVar,
    Command,
    Grid,
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
  unlessover?: AlgolSet<
    BattlePos,
    BattleVar,
    Command,
    Grid,
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
};
