import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../../common";
import { AlgolEffectAnon, TestSuite } from "../../../../types";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Moving",
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
              unit1: { id: "unit1", pos: "a1" }
            },
            UNITLAYERS: {
              units: { a1: { id: "unit1" } }
            },
            MARKS: { unit1mark: "a1", othermark: "c3" }
          },
          tests: [
            {
              expr: { moveat: ["unit1mark", "othermark"] },
              sample: "UNITDATA.unit1.pos",
              res: "c3"
            },
            {
              expr: { moveid: [{ value: "unit1" }, "othermark"] },
              sample: "UNITDATA.unit1.pos",
              res: "c3"
            }
          ]
        }
      ]
    }
  ]
};
