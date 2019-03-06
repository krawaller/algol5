import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolWriterSuite } from "../../../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
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
              sample: "TURNVARS.newturnvar",
              res: 5,
              desc: "We can set a new turnvar"
            },
            {
              expr: {
                effects: [
                  { setturnvar: [{ value: "newturnvar" }, { sum: [3, 2] }] }
                ]
              },
              sample: "TURNVARS.newturnvar",
              res: 5,
              desc: "Setturnvar supports value expressions for name and value"
            },
            {
              expr: {
                effects: [
                  { setturnvar: [{ value: "newturnvar" }, { sum: [3, 2] }] }
                ]
              },
              sample: "TURNVARS.previous",
              res: 666,
              desc: "Existing turnvar isn't affected when we set a new one"
            },
            {
              expr: { effects: [{ setturnpos: ["newturnpos", "mymark"] }] },
              sample: "TURNVARS.newturnpos",
              res: "a1",
              desc: "We can set a new turnpos"
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
              sample: "BATTLEVARS.newbattlevar",
              res: 5,
              desc: "We can set a new battlevar"
            },
            {
              expr: {
                effects: [
                  {
                    setbattlevar: [{ value: "newbattlevar" }, { sum: [3, 2] }]
                  }
                ]
              },
              sample: "BATTLEVARS.newbattlevar",
              res: 5,
              desc: "Setbattlevar supports value expressions for name and value"
            },
            {
              expr: {
                effects: [
                  {
                    setbattlevar: [{ value: "newbattlevar" }, { sum: [3, 2] }]
                  }
                ]
              },
              sample: "BATTLEVARS.previous",
              res: 666,
              desc: "Existing battlevar isn't affected when we set a new one"
            },
            {
              expr: { effects: [{ setbattlepos: ["newbattlepos", "mymark"] }] },
              sample: "BATTLEVARS.newbattlepos",
              res: "a1",
              desc: "We can set a new battlepos"
            }
          ]
        }
      ]
    }
  ]
};
