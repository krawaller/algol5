import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Order - Anim",
  func: executeOrder,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "mycmnd",
      contexts: [
        {
          context: {
            MARKS: { mark1: "a1", mark2: "b2" },
            anim: { enterFrom: {}, exitTo: {} }
          },
          tests: [
            {
              expr: { anims: [{ enterfrom: ["mark1", "mark2"] }] },
              asserts: [
                {
                  sample: "anim.enterFrom",
                  res: { a1: "b2" },
                  desc: "we can make enterFrom anims"
                }
              ]
            },
            {
              expr: { anims: [{ exitto: ["mark1", "mark2"] }] },
              asserts: [
                {
                  sample: "anim.exitTo",
                  res: { a1: "b2" },
                  desc: "we can make exitTo anims"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
