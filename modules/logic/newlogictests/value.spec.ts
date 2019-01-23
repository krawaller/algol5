import { AlgolValAnon } from "../../types";
import { emptyFullDef, run, ParserTest } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolValAnon>[] = [
  {
    def: emptyFullDef,
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {},
        tests: [
          { expr: "foo", res: "foo" },
          { expr: { value: { value: { value: 5 } } }, res: 5 },
          { expr: 7, res: 7 },
          { expr: { minus: [6, 3, { value: 2 }] }, res: 1 },
          { expr: { playercase: [{ playercase: [777, 2] }, 666] }, res: 777 }
        ]
      },
      { context: { DIR: 666 }, tests: [{ expr: ["dir"], res: 666 }] }
    ]
  }
];

test("new expression - values", t => {
  run(tests, "val", t);
  t.end();
});
