import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolWriterSuite } from "../../../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
  title: "Effect - Adopting",
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
              unit1: { id: "unit1", pos: "a1", owner: 1 },
              unit2: { id: "unit2", pos: "b2", owner: 1 }
            },
            UNITLAYERS: {
              units: { a1: { id: "unit1" }, b2: { id: "unit2" } }
            },
            MARKS: { unit1mark: "a1", unit2mark: "b2" }
          },
          tests: [
            {
              expr: { effects: [{ adoptat: ["unit1mark", { value: 0 }] }] },
              sample: "UNITDATA.unit1.owner",
              res: 0
            },
            {
              expr: {
                effects: [
                  {
                    adoptid: [{ value: "unit2" }, { value: ["otherplayer"] }]
                  }
                ]
              },
              sample: "UNITDATA.unit2.owner",
              res: 2
            },
            {
              expr: { effects: [{ adoptin: ["units", 0] }] },
              sample:
                "UNITDATA.unit1.owner === 0 && UNITDATA.unit2.owner === 0",
              res: truthy
            }
          ]
        }
      ]
    }
  ]
};
