export type FilterDef<
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
  type: "filter";
  layer: any;
  tolayer: ArtifactLayer;
  matching?: any;
};
