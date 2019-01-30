import { AlgolEntity } from "../";

export type Setup<Position extends string, Unit extends string> = Partial<
  {
    [unit in Unit]: Partial<{
      0: AlgolEntity<Position>[];
      1: AlgolEntity<Position>[];
      2: AlgolEntity<Position>[];
    }>
  }
>;

export type SetupAnon = Setup<string, string>;
