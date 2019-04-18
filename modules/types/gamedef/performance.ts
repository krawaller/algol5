export type AlgolPerformance<Command extends string, Mark extends string> = {
  canAlwaysEnd: Partial<{ [actionName in Command | Mark]: boolean }>;
};
