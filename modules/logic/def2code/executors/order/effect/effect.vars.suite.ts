import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Vars",
  func: executeOrder,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            TURNVARS: { foo: 2 },
          },
          tests: [
            {
              expr: { effects: [{ setturnvar: ["bar", "gnark"] }] },
              asserts: [
                {
                  sample: "TURNVARS.bar",
                  res: "gnark",
                },
              ],
            },
            {
              expr: { effects: [{ incturnvar: ["bar", 3] }] },
              asserts: [
                {
                  sample: "TURNVARS.bar",
                  res: 3,
                },
              ],
            },
            {
              expr: { effects: [{ incturnvar: ["foo", 3] }] },
              asserts: [
                {
                  sample: "TURNVARS.foo",
                  res: 5,
                },
              ],
            },
            {
              expr: { effects: [{ incturnvar: ["foo", -2] }] },
              asserts: [
                {
                  sample: "TURNVARS.foo",
                  res: 0,
                },
              ],
            },
            {
              expr: { effects: [{ incturnvar: ["foo"] }] },
              asserts: [
                {
                  sample: "TURNVARS.foo",
                  res: 3,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
