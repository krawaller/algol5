import { executeSection } from "../../executors";
import { emptyFullDef } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Init",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            step: {  MARKS: { oldermark: "a1" } },
            newMarkPos: 'b2'
          },
          tests: [
            {
              expr: ['mark-init'],
              asserts: [
                {
                  sample: "MARKS",
                  res: { oldermark: 'a1', somemark: 'b2' }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
