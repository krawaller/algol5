import { executeEffect } from "../def2code2/actions/effect";
import { emptyFullDef } from "../../common";
import { AlgolEffectAnon } from "../../types";
import { runSuite, TestSuite, truthy, falsy } from "./utils";

const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "effect - stomping",
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

runSuite(testSuite, executeEffect);
