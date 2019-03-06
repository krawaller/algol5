import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolWriterSuite } from "../../../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
  title: "Effect - Morphing",
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
              unit1: { id: "unit1", pos: "a1", group: "flurps" },
              unit2: { id: "unit2", pos: "b2", group: "gnurps" }
            },
            UNITLAYERS: {
              units: { a1: { id: "unit1" }, b2: { id: "unit2" } }
            },
            MARKS: { unit1mark: "a1", unit2mark: "b2" }
          },
          tests: [
            {
              expr: {
                effects: [{ morphat: ["unit1mark", { value: "berps" }] }]
              },
              sample: "UNITDATA.unit1.group",
              res: "berps"
            },
            {
              expr: {
                effects: [{ morphid: [{ value: "unit2" }, { value: "berps" }] }]
              },
              sample: "UNITDATA.unit2.group",
              res: "berps"
            },
            {
              expr: { effects: [{ morphin: ["units", "berps"] }] },
              sample:
                "UNITDATA.unit1.group === 'berps' && UNITDATA.unit2.group === 'berps'",
              res: truthy
            }
          ]
        }
      ]
    }
  ]
};
