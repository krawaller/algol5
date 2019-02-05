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
          MARKS: { unit1mark: "a1", unit2mark: "b2" }
        },
        tests: [
          {
            expr: { setat: ["unit1mark", { value: "prop" }, { value: "wee" }] },
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
];

test("effects - setting", t => {
  run(tests, executeEffect, t);
  t.end();
});
