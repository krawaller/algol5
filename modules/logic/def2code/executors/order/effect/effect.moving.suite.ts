import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Moving",
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
            },
            UNITLAYERS: {
              units: { a1: { id: "unit1" } },
            },
            MARKS: { unit1mark: "a1", othermark: "c3" },
          },
          tests: [
            {
              expr: { effects: [{ moveat: ["unit1mark", "othermark"] }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1.pos",
                  res: "c3",
                },
              ],
            },
            {
              expr: {
                effects: [{ moveid: [{ value: "unit1" }, "othermark"] }],
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1.pos",
                  res: "c3",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
