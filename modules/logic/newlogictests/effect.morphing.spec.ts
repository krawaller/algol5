import { executeEffect } from "../def2code2/actions/effect";
import { emptyFullDef } from "../../common";
import { AlgolEffectAnon } from "../../types";
import { run, ParserTest, truthy, falsy } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolEffectAnon>[] = [
  {
    def: emptyFullDef,
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {
          UNITDATA: {
            unit1: { id: "unit1", pos: "a1", group: "flurps" },
            unit2: { id: "unit2", pos: "b2", group: "gnurps" }
          },
          UNITLAYERS: {
            units: { a1: { id: "unit1" }, b2: { id: "unit2" } }
          },
          MARKS: { unit1mark: "a1", unit2mark: "b2" }
        },
        tests: [
          {
            expr: { morphat: ["unit1mark", { value: "berps" }] },
            sample: "UNITDATA.unit1.group",
            res: "berps"
          },
          {
            expr: { morphid: [{ value: "unit2" }, { value: "berps" }] },
            sample: "UNITDATA.unit2.group",
            res: "berps"
          },
          {
            expr: { morphin: ["units", "berps"] },
            sample:
              "UNITDATA.unit1.group === 'berps' && UNITDATA.unit2.group === 'berps'",
            res: truthy
          }
        ]
      }
    ]
  }
];

test("effects - morphing", t => {
  run(tests, executeEffect, t);
  t.end();
});
