export type Setup<Position extends string, Unit extends string> = Partial<
  { [unit in Unit]: any }
>;
