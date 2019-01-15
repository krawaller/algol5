import { AlgolVal, AlgolBool, AlgolSet } from "../../";

export type DrawDef<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
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
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
  ifover?: AlgolSet<
    BattlePos,
    BattleVar,
    Command,
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
  unlessover?: AlgolSet<
    BattlePos,
    BattleVar,
    Command,
    Layer,
    Mark,
    TurnPos,
    TurnVar
  >;
};
