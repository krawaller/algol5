import { AlgolPosAnon } from "../../types";
import { emptyFullDef, run, ParserTest } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolPosAnon>[] = [
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
          }
        ]
      }
    ]
  }
];

test("new expression - position", t => {
  run(tests, "pos", t);
  t.end();
});
