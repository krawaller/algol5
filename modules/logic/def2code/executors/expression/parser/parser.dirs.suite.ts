import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolDirsAnon, AlgolExpressionSuite } from "../../../../../types";
import { parserTester } from "../";

export const testSuite: AlgolExpressionSuite<AlgolDirsAnon, number[]> = {
  title: "Primitive - Dirs",
  func: parserTester("dirs"),
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {},
          tests: [
            { expr: ["diag"], res: [2, 4, 6, 8] },
            { expr: ["ortho"], res: [1, 3, 5, 7] },
            { expr: ["rose"], res: [1, 2, 3, 4, 5, 6, 7, 8] },
            { expr: { list: [1, 4] }, res: [1, 4] }
          ]
        }
      ]
    }
  ]
};
