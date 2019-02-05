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
];

test("effects - moving", t => {
  run(tests, executeEffect, t);
  t.end();
});
