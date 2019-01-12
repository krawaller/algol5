export type Setup<Unit extends string = string> = Partial<
  { [unit in Unit]: any }
>;
