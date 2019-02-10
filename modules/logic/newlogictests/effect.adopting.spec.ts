import { executeEffect } from "../def2code2/actions/effect";
import { emptyFullDef } from "../../common";
import { AlgolEffectAnon } from "../../types";
import { runSuite, TestSuite, truthy, falsy } from "./utils";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "effect - adopting",
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
              expr: { adoptat: ["unit1mark", { value: 0 }] },
              sample: "UNITDATA.unit1.owner",
              res: 0
            },
            {
              expr: {
                adoptid: [{ value: "unit2" }, { value: ["otherplayer"] }]
              },
              sample: "UNITDATA.unit2.owner",
              res: 2
            },
            {
              expr: { adoptin: ["units", 0] },
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

runSuite(testSuite, executeEffect);
