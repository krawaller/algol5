import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../../common";
import { AlgolEffectAnon, AlgolWriterSuite } from "../../../../types";

export const testSuite: AlgolWriterSuite<AlgolEffectAnon> = {
  title: "Effect - Util",
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
                forposin: [{ single: "unit1mark" }, { killat: ["looppos"] }]
              },
              sample: "!UNITDATA.unit1 && UNITDATA.unit2",
              res: truthy
            },
            {
              expr: { multi: [{ killid: "unit2" }, { killid: "unit1" }] },
              sample: "UNITDATA.unit1 || UNITDATA.unit2",
              res: falsy
            },
            {
              expr: {
                foridin: [{ single: "unit1mark" }, { killid: ["loopid"] }]
              },
              sample: "!UNITDATA.unit1 && UNITDATA.unit2",
              res: truthy
            },
            {
              expr: { foridin: ["units", { killid: ["loopid"] }] },
              sample: "UNITDATA",
              res: {}
            }
          ]
        }
      ]
    }
  ]
};
