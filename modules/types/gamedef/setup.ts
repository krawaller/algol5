import { AlgolEntity } from "../";

export type AlgolSetup<Position extends string, Unit extends string> = Partial<
  {
    [unit in Unit]: Partial<{
      0: AlgolEntity<Position>[];
      1: AlgolEntity<Position>[];
      2: AlgolEntity<Position>[];
    }>;
  }
>;

export type AlgolSetupAnon = AlgolSetup<string, string>;

export type AlgolSetupBook<Position extends string, Unit extends string> = {
  basic: AlgolSetup<Position, Unit>;
} & Record<string, AlgolSetup<Position, Unit>>;

export type AlgolSetupBookAnon = AlgolSetupBook<string, string>;
