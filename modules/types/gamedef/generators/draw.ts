import { AlgolVal, AlgolBool, AlgolSet } from "../../";

export type DrawDef<
  Layer extends string = string,
  Mark extends string = string,
  Command extends string = string,
  TurnPos extends string = string,
  TurnVar extends string = string,
  BattlePos extends string = string,
  BattleVar extends string = string,
  ArtifactLayer extends string = string
> = {
  tolayer: AlgolVal<
    Layer,
    Mark,
    Command,
    TurnPos,
    TurnVar,
    BattlePos,
    BattleVar,
    ArtifactLayer
  >;
  include?: any;
  condition?: AlgolBool<
    Layer,
    Mark,
    Command,
    TurnPos,
    TurnVar,
    BattlePos,
    BattleVar
  >;
  ifover?: AlgolSet<
    Layer,
    Mark,
    Command,
    TurnPos,
    TurnVar,
    BattlePos,
    BattleVar
  >;
  unlessover?: AlgolSet<
    Layer,
    Mark,
    Command,
    TurnPos,
    TurnVar,
    BattlePos,
    BattleVar
  >;
};
