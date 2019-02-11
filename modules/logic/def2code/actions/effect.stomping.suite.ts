import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolEffectAnon, TestSuite } from "../../../types";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Stomping",
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
              unit1: { id: "unit1", pos: "a1" },
              unit2: { id: "unit2", pos: "b2" }
            },
            UNITLAYERS: {
              units: { a1: { id: "unit1" }, b2: { id: "unit2" } }
            },
            MARKS: { unit1mark: "a1", unit2mark: "b2" }
          },
          tests: [
            {
              expr: { stompat: ["unit1mark", "unit2mark"] },
              sample: "UNITDATA.unit1.pos === 'b2' && !UNITDATA.unit2",
              res: truthy
            },
            {
              expr: { stompid: [{ value: "unit1" }, "unit2mark"] },
              sample: "UNITDATA.unit1.pos === 'b2' && !UNITDATA.unit2",
              res: truthy
            }
          ]
        }
      ]
    }
  ]
};
