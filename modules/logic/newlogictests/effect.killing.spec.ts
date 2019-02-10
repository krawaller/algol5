import { executeEffect } from "../def2code2/actions/effect";
import { emptyFullDef } from "../../common";
import { AlgolEffectAnon } from "../../types";
import { runSuite, TestSuite, truthy, falsy } from "./utils";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Killing",
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
            MARKS: { unit1mark: "a1" }
          },
          tests: [
            {
              expr: { killat: "unit1mark" },
              sample: "UNITDATA.unit2 && !UNITDATA.unit1",
              res: truthy
            },
            {
              expr: { killid: "unit1" },
              sample: "UNITDATA.unit1",
              res: falsy
            },
            {
              expr: { killid: { value: "unit1" } },
              sample: "UNITDATA.unit1",
              res: falsy
            },
            {
              expr: { killin: { single: "unit1mark" } },
              sample: "!UNITDATA.unit1 && UNITDATA.unit2",
              res: truthy
            }
          ]
        }
      ]
    }
  ]
};

runSuite(testSuite);
