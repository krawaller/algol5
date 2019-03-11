import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Order - UpdateUnitLayers",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: {
              from: ""
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            newMarkPos: "b2",
            MARKS: { oldermark: "a1" }
          },
          tests: [
            {
              expr: ["addMark"],
              asserts: [
                {
                  sample: "MARKS",
                  res: {
                    oldermark: "a1",
                    somemark: "b2"
                  },
                  desc: "correctly adds new mark"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
