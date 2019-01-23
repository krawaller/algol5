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
          },
          {
            expr: { same: [{ value: 2 }, { value: 3 }] },
            res: false
          },
          {
            expr: { same: [{ value: 2 }, 2] },
            res: true
          },
          {
            expr: { different: [{ value: 2 }, { value: 3 }] },
            res: true
          },
          {
            expr: { different: [{ value: 2 }, 2] },
            res: false
          },
          { expr: { truthy: { value: 0 } }, res: false },
          { expr: { truthy: { value: 1 } }, res: true },
          { expr: { falsy: { value: 0 } }, res: true },
          { expr: { falsy: { value: 1 } }, res: false }
        ]
      },
      {
        context: {
          MARKS: { firstmark: "b2", secondmark: "a1" },
          BOARD: { board: { a1: { x: 1, y: 1 }, b2: { x: 2, y: 2 } } }
        },
        tests: [
          { expr: { samepos: ["firstmark", "secondmark"] }, res: false },
          { expr: { samepos: ["firstmark", "firstmark"] }, res: true },
          { expr: { higher: ["firstmark", "secondmark"] }, res: true },
          { expr: { higher: ["firstmark", "firstmark"] }, res: false },
          { expr: { higher: ["secondmark", "firstmark"] }, res: false }
        ]
      },
      {
        context: {
          step: { available: { someaction: 1, somemark: 1 } }
        },
        tests: [
          { expr: { cmndavailable: "someaction" }, res: true },
          { expr: { cmndavailable: "otheraction" }, res: false },
          { expr: { markavailable: "somemark" }, res: true },
          { expr: { markavailable: "othermark" }, res: false }
        ]
      }
    ]
  }
];

test("new expression - booleans", t => {
  run(tests, "bool", t);
  t.end();
});
