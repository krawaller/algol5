import { AlgolBoolAnon } from "../../types";
import { emptyFullDef, run, ParserTest } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolBoolAnon>[] = [
  {
    def: emptyFullDef,
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {},
        tests: [
          { expr: ["true"], res: true },
          { expr: ["false"], res: false },
          { expr: { morethan: [{ value: 3 }, { value: 4 }] }, res: false },
          { expr: { morethan: [{ value: 3 }, { value: 3 }] }, res: false },
          { expr: { morethan: [{ value: 3 }, { value: 2 }] }, res: true },
          {
            expr: {
              playercase: [{ playercase: [["true"], ["false"]] }, ["false"]]
            },
            res: true
          },
          {
            expr: { ifactionelse: ["someaction", ["true"], ["false"]] },
            res: true
          },
          {
            expr: { ifactionelse: ["otheraction", ["true"], ["false"]] },
            res: false
          },
          {
            expr: { ifelse: [["true"], ["true"], ["false"]] },
            res: true
          },
          {
            expr: { ifelse: [["false"], ["true"], ["false"]] },
            res: false
          }
        ]
      }
    ]
  }
];

test("new expression - booleans", t => {
  run(tests, "bool", t);
  t.end();
});
