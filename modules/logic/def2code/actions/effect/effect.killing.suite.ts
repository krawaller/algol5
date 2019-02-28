import { executeOrder } from "../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../common";
import { AlgolOrderAnon, AlgolWriterSuite } from "../../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
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
              sample: "UNITDATA.unit2 && !UNITDATA.unit1",
              res: truthy
            },
            {
              expr: { effects: [{ killid: "unit1" }] },
              sample: "UNITDATA.unit1",
              res: falsy
            },
            {
              expr: { effects: [{ killid: { value: "unit1" } }] },
              sample: "UNITDATA.unit1",
              res: falsy
            },
            {
              expr: { effects: [{ killin: { single: "unit1mark" } }] },
              sample: "!UNITDATA.unit1 && UNITDATA.unit2",
              res: truthy
            }
          ]
        }
      ]
    }
  ]
};
