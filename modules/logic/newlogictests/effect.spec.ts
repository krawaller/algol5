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
          UNITDATA: { foo: "iwillsurvive", killme: "please" },
          UNITLAYERS: { units: { a1: { id: "killme" } } },
          MARKS: { mymark: "a1" }
        },
        tests: [
          {
            expr: { killat: "mymark" },
            sample: "UNITDATA",
            res: { foo: "iwillsurvive" }
          },
          {
            expr: { killid: "killme" },
            sample: "UNITDATA.killme",
            res: falsy
          },
          {
            expr: { killid: { value: "killme" } },
            sample: "UNITDATA.killme",
            res: falsy
          }
        ]
      }
    ]
  }
];

test("effects", t => {
  run(tests, executeEffect, t);
  t.end();
});
