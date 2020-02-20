export type AlgolPerformance<Command extends string, Mark extends string> = {
  canAlwaysEnd: Partial<
    { [actionName in Command | Mark | "startTurn"]: boolean }
  >;
  massiveTree?: Partial<
    { [actionName in Command | Mark | "startTurn"]: boolean }
  >;
  noEndGameCheck?: Command[];
};
