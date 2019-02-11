import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolEffectAnon, TestSuite } from "../../../types";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Meta",
  func: executeEffect,
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
              expr: { setturnvar: ["newturnvar", 5] },
              sample: "TURNVARS.newturnvar",
              res: 5,
              desc: "We can set a new turnvar"
            },
            {
              expr: { setturnvar: [{ value: "newturnvar" }, { sum: [3, 2] }] },
              sample: "TURNVARS.newturnvar",
              res: 5,
              desc: "Setturnvar supports value expressions for name and value"
            },
            {
              expr: { setturnvar: [{ value: "newturnvar" }, { sum: [3, 2] }] },
              sample: "TURNVARS.previous",
              res: 666,
              desc: "Existing turnvar isn't affected when we set a new one"
            },
            {
              expr: { setturnpos: ["newturnpos", "mymark"] },
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
              expr: { setbattlevar: ["newbattlevar", 5] },
              sample: "BATTLEVARS.newbattlevar",
              res: 5,
              desc: "We can set a new battlevar"
            },
            {
              expr: {
                setbattlevar: [{ value: "newbattlevar" }, { sum: [3, 2] }]
              },
              sample: "BATTLEVARS.newbattlevar",
              res: 5,
              desc: "Setbattlevar supports value expressions for name and value"
            },
            {
              expr: {
                setbattlevar: [{ value: "newbattlevar" }, { sum: [3, 2] }]
              },
              sample: "BATTLEVARS.previous",
              res: 666,
              desc: "Existing battlevar isn't affected when we set a new one"
            },
            {
              expr: { setbattlepos: ["newbattlepos", "mymark"] },
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
