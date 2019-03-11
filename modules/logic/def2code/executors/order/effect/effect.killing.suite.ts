import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Killing",
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
            MARKS: { unit1mark: "a1" }
          },
          tests: [
            {
              expr: { effects: [{ killat: "unit1mark" }] },
              asserts: [
                {
                  sample: "UNITDATA.unit2",
                  res: truthy
                },
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                }
              ]
            },
            {
              expr: { effects: [{ killid: "unit1" }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                }
              ]
            },
            {
              expr: { effects: [{ killid: { value: "unit1" } }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                }
              ]
            },
            {
              expr: { effects: [{ killin: { single: "unit1mark" } }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                },
                {
                  sample: "UNITDATA.unit2",
                  res: truthy
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
