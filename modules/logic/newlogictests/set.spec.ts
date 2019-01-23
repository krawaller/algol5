import { AlgolSetAnon } from "../../types";
import { emptyFullDef, run, ParserTest } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolSetAnon>[] = [
  {
    def: emptyFullDef,
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: { MARKS: { mymark: "h9" } },
        tests: [
          {
            expr: { single: "mymark" },
            res: { h9: 1 }
          }
        ]
      }
    ]
  }
];

test("new expression - set", t => {
  run(tests, "set", t);
  t.end();
});
