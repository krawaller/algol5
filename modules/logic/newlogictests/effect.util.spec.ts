import { executeEffect } from "../def2code2/actions/effect";
import { emptyFullDef } from "../../common";
import { AlgolEffectAnon } from "../../types";
import { run, ParserTest, truthy, falsy } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolEffectAnon>[] = [
  {
    def: {
      ...emptyFullDef,
      board: {
        ...emptyFullDef.board,
        terrain: {
          unit1terrain: ["a1"]
        }
      }
    },
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
];

test("effects - utility", t => {
  run(tests, executeEffect, t);
  t.end();
});
