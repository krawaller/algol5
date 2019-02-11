import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolEffectAnon, TestSuite } from "../../../types";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Adopting",
  func: executeEffect,
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
