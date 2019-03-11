import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Setting",
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
              expr: {
                effects: [
                  {
                    setat: ["unit1mark", { value: "prop" }, { value: "wee" }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1.prop",
                  res: "wee"
                }
              ]
            },
            {
              expr: {
                effects: [{ setin: [{ single: "unit1mark" }, "prop", "wee"] }]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1.prop",
                  res: "wee"
                }
              ]
            },
            {
              expr: { effects: [{ setid: ["unit2", "prop", "wee"] }] },
              asserts: [
                {
                  sample: "UNITDATA.unit2.prop",
                  res: "wee"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
