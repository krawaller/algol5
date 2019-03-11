import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Stomping",
  func: executeOrder,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            UNITDATA: {
              unit1: { id: "unit1", pos: "a1" },
              unit2: { id: "unit2", pos: "b2" }
            },
            UNITLAYERS: {
              units: { a1: { id: "unit1" }, b2: { id: "unit2" } }
            },
            MARKS: { unit1mark: "a1", unit2mark: "b2" }
          },
          tests: [
            {
              expr: { effects: [{ stompat: ["unit1mark", "unit2mark"] }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1.pos",
                  res: "b2"
                },
                {
                  sample: "UNITDATA.unit2",
                  res: falsy
                }
              ]
            },
            {
              expr: {
                effects: [{ stompid: [{ value: "unit1" }, "unit2mark"] }]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1.pos",
                  res: "b2"
                },
                {
                  sample: "UNITDATA.unit2",
                  res: falsy
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
