import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Order - Anim",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            mycmnd: {}
          }
        },
        anim: {
          mycmnd: [{ enterfrom: ["mark1", "mark2"] }]
        }
      },
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: {
            MARKS: { mark1: "a1", mark2: "b2" },
            anim: { enterFrom: {} }
          },
          tests: [
            {
              expr: { anims: [{ enterfrom: ["mark1", "mark2"] }] },
              asserts: [
                {
                  sample: "anim.enterFrom",
                  res: { b2: "a1" },
                  desc: "we can make enterFrom anims"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
