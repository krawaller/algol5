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
          },
          { expr: { onlyin: { single: "mymark" } }, res: "h9" }
        ]
      },
      {
        context: { POS: "i2" },
        tests: [{ expr: ["target"], res: "i2" }]
      },
      {
        context: { STARTPOS: "c4" },
        tests: [{ expr: ["start"], res: "c4" }]
      }
    ]
  }
];

test("new expression - position", t => {
  run(tests, "pos", t);
  t.end();
});
