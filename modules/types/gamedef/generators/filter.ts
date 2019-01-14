export type FilterDef<
  ArtifactLayer,
  BattlePos,
  BattleVar,
  Command,
  Layer,
  Mark,
  TurnPos,
  TurnVar
> = {
  type: "filter";
  layer: any;
  tolayer: ArtifactLayer;
  matching?: any;
};
