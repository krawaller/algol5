import { emptyFullDef } from "../../common";
import { AlgolPosAnon } from "../../types";
import { runSuite, TestSuite, parserTester } from "./utils";

export const testSuite: TestSuite<AlgolPosAnon> = {
  title: "primitive - pos",
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: { MARKS: { mymark: "h9", myothermark: "q5" } },
          tests: [
            { expr: "mymark", res: "h9" },
            {
              expr: { mark: { playercase: ["myothermark", "mymark"] } },
              res: "q5"
            },
            { expr: { onlyin: { single: "mymark" } }, res: "h9" },
            { expr: { indexlist: [0, "mymark", "myothermark"] }, res: "h9" },
            { expr: { indexlist: [1, "mymark", "myothermark"] }, res: "q5" }
          ]
        },
        {
          context: { POS: "i2" },
          tests: [{ expr: ["target"], res: "i2" }]
        },
        {
          context: { STARTPOS: "c4" },
          tests: [{ expr: ["start"], res: "c4" }]
        },
        {
          context: { TURNVARS: { thatpos: "h4" } },
          tests: [{ expr: { turnpos: "thatpos" }, res: "h4" }]
        },
        {
          context: { BATTLEVARS: { thispos: "b6" } },
          tests: [{ expr: { battlepos: "thispos" }, res: "b6" }]
        },
        {
          context: { LOOPPOS: "a1" },
          tests: [{ expr: ["looppos"], res: "a1" }]
        }
      ]
    }
  ]
};

runSuite(testSuite, parserTester("pos"));
