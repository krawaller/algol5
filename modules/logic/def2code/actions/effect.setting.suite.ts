import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolEffectAnon, TestSuite } from "../../../types";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Setting",
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
              expr: {
                setat: ["unit1mark", { value: "prop" }, { value: "wee" }]
              },
              sample: "UNITDATA.unit1.prop",
              res: "wee"
            },
            {
              expr: { setin: [{ single: "unit1mark" }, "prop", "wee"] },
              sample: "UNITDATA.unit1.prop",
              res: "wee"
            },
            {
              expr: { setid: ["unit2", "prop", "wee"] },
              sample: "UNITDATA.unit2.prop",
              res: "wee"
            }
          ]
        }
      ]
    }
  ]
};
