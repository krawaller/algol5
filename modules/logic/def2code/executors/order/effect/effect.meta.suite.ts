import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Meta",
  func: executeOrder,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            TURNVARS: { previous: 666 },
            MARKS: { mymark: "a1" }
          },
          tests: [
            {
              expr: { effects: [{ setturnvar: ["newturnvar", 5] }] },
              asserts: [
                {
                  sample: "TURNVARS.newturnvar",
                  res: 5,
                  desc: "We can set a new turnvar"
                },
                {
                  sample: "TURNVARS.previous",
                  res: 666,
                  desc: "Existing turnvar isn't affected when we set a new one"
                }
              ]
            },
            {
              expr: {
                effects: [
                  { setturnvar: [{ value: "newturnvar" }, { sum: [3, 2] }] }
                ]
              },
              asserts: [
                {
                  sample: "TURNVARS.newturnvar",
                  res: 5,
                  desc:
                    "Setturnvar supports value expressions for name and value"
                }
              ]
            },
            {
              expr: { effects: [{ setturnpos: ["newturnpos", "mymark"] }] },
              asserts: [
                {
                  sample: "TURNVARS.newturnpos",
                  res: "a1",
                  desc: "We can set a new turnpos"
                }
              ]
            }
          ]
        },
        {
          context: {
            BATTLEVARS: { previous: 666 },
            MARKS: { mymark: "a1" }
          },
          tests: [
            {
              expr: { effects: [{ setbattlevar: ["newbattlevar", 5] }] },
              asserts: [
                {
                  sample: "BATTLEVARS.newbattlevar",
                  res: 5,
                  desc: "We can set a new battlevar"
                },
                {
                  sample: "BATTLEVARS.previous",
                  res: 666,
                  desc:
                    "Existing battlevar isn't affected when we set a new one"
                }
              ]
            },
            {
              expr: {
                effects: [
                  {
                    setbattlevar: [{ value: "newbattlevar" }, { sum: [3, 2] }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "BATTLEVARS.newbattlevar",
                  res: 5,
                  desc:
                    "Setbattlevar supports value expressions for name and value"
                }
              ]
            },
            {
              expr: { effects: [{ setbattlepos: ["newbattlepos", "mymark"] }] },
              asserts: [
                {
                  sample: "BATTLEVARS.newbattlepos",
                  res: "a1",
                  desc: "We can set a new battlepos"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
