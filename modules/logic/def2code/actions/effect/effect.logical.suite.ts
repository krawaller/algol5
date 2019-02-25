import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../../common";
import { AlgolEffectAnon, AlgolWriterSuite } from "../../../../types";

export const testSuite: AlgolWriterSuite<AlgolEffectAnon> = {
  title: "Effect - Logical",
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
            MARKS: { unit1mark: "a1", othermark: "c3", unit2mark: "b2" }
          },
          tests: [
            {
              expr: {
                ifelse: [
                  ["true"],
                  { killat: "unit1mark" },
                  { killat: "unit2mark" }
                ]
              },
              sample: "!UNITDATA.unit1 && UNITDATA.unit2",
              res: truthy
            },
            {
              expr: {
                if: [["true"], { killat: "unit1mark" }]
              },
              sample: "UNITDATA.unit1",
              res: falsy
            },
            {
              expr: {
                if: [["false"], { killat: "unit1mark" }]
              },
              sample: "UNITDATA.unit1",
              res: truthy
            }
          ]
        }
      ]
    }
  ]
};
