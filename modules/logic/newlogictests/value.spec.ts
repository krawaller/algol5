import { emptyFullDef } from "../../common";
import { AlgolValAnon } from "../../types";
import { run, ParserTest } from "./utils";

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
          { expr: ["player"], res: 1 },
          { expr: ["otherplayer"], res: 2 },
          { expr: { value: { value: { value: 5 } } }, res: 5 },
          { expr: 7, res: 7 },
          { expr: { minus: [6, 3, { value: 2 }] }, res: 1 },
          { expr: { playercase: [{ playercase: [777, 2] }, 666] }, res: 777 },
          { expr: { ifactionelse: ["someaction", 1, 666] }, res: 1 },
          {
            expr: { ifactionelse: ["otheraction", 1, { value: 666 }] },
            res: 666
          },
          { expr: { prod: [{ minus: [5, 3] }, 5, 3] }, res: 30 },
          {
            expr: { indexlist: [{ minus: [2, 1] }, "foo", { value: "bar" }] },
            res: "bar"
          },
          { expr: { ifelse: [["true"], { value: 1 }, 2] }, res: 1 },
          { expr: { ifelse: [["false"], 1, { value: 2 }] }, res: 2 },
          { expr: { if: [["true"], "foo"] }, res: "foo" },
          { expr: { if: [["false"], "foo"] }, res: undefined }
        ]
      },
      { context: { DIR: 666 }, tests: [{ expr: ["dir"], res: 666 }] },
      {
        context: { TURNVARS: { foo: 666 } },
        tests: [{ expr: { turnvar: { value: "foo" } }, res: 666 }]
      },
      {
        context: { BATTLEVARS: { foo: 666 } },
        tests: [{ expr: { battlevar: { value: "foo" } }, res: 666 }]
      },
      {
        context: { MARKS: { somemark: "wee" } },
        tests: [{ expr: { sizeof: { single: "somemark" } }, res: 1 }]
      }
    ]
  },
  {
    def: emptyFullDef,
    player: 2,
    action: "someaction",
    contexts: [
      {
        context: {},
        tests: [
          { expr: ["player"], res: 2 },
          { expr: ["otherplayer"], res: 1 },
          { expr: { playercase: [666, { value: "yes" }] }, res: "yes" }
        ]
      }
    ]
  }
];

test("new expression - values", t => {
  run(tests, "val", t);
  t.end();
});
