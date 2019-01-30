import { emptyFullDef } from "../../common";
import { AlgolSetAnon } from "../../types";
import { run, ParserTest } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolSetAnon>[] = [
  {
    def: emptyFullDef,
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {
          BOARD: {
            board: { b: "oard" },
            light: { l: "ight" },
            dark: { d: "ark" }
          }
        },
        tests: [
          { expr: "board", res: { b: "oard" } },
          { expr: "light", res: { l: "ight" } },
          { expr: "dark", res: { d: "ark" } },
          { expr: { layer: "dark" }, res: { d: "ark" } }
        ]
      },
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
  },
  {
    def: {
      ...emptyFullDef,
      board: {
        ...emptyFullDef.board,
        terrain: {
          boo: { 1: ["a1"], 2: ["b2"] }
        }
      },
      generators: {
        foo: {
          type: "walker",
          draw: {
            start: {
              tolayer: "gnurp"
            }
          }
        }
      }
    },
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: { ARTIFACTS: { gnurp: { g1: { gnurp: 1 } } } },
        tests: [{ expr: "gnurp", res: { g1: { gnurp: 1 } } }]
      },
      {
        context: { TERRAIN: { myboo: { a1: { boo: 1 } } } },
        tests: [{ expr: "myboo", res: { a1: { boo: 1 } } }]
      }
    ]
  }
];

test("new expression - set", t => {
  run(tests, "set", t);
  t.end();
});
