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
        graphics: {
          ...emptyFullDef.graphics,
          icons: { gnurps: "pawn" }
        }
      },
      player: 1,
      action: "mycmnd",
      contexts: [
        {
          context: {
            MARKS: { mark1: "a1", mark2: "b2" },
            anim: { enterFrom: {}, exitTo: {}, ghosts: [] }
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
            },
            {
              expr: {
                anims: [{ ghost: ["mark1", "mark2", "gnurps", ["player"]] }]
              },
              asserts: [
                {
                  sample: "anim.ghosts",
                  res: [["a1", "b2", "pawn", 1]]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
