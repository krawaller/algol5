import { executeEffect } from "../def2code2/actions/effect";
import { emptyFullDef } from "../../common";
import { AlgolEffectAnon } from "../../types";
import { run, ParserTest, truthy, falsy } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolEffectAnon>[] = [
  {
    def: {
      ...emptyFullDef,
      board: {
        ...emptyFullDef.board,
        terrain: {
          unit1terrain: ["a1"]
        }
      }
    },
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {
          UNITDATA: {
            unit1: { id: "unit1", pos: "a1" },
            unit2: { id: "unit2", pos: "b2" }
          },
          UNITLAYERS: {
            units: { a1: { id: "unit1" }, b2: { id: "unit2" } }
          },
          MARKS: { unit1mark: "a1", othermark: "c3", unit2mark: "b2" },
          TERRAIN: { unit1terrain: { a1: {} } },
          clones: 2
        },
        tests: [
          {
            expr: {
              spawn: ["othermark", "flerps", 1, { baz: { value: "bin" } }]
            },
            sample: "UNITDATA.clone3",
            res: {
              id: "clone3",
              group: "flerps",
              owner: 1,
              baz: "bin",
              pos: "c3"
            }
          },
          {
            expr: {
              spawn: ["othermark", "flerps", 1, { baz: { value: "bin" } }]
            },
            sample: "clones",
            res: 3,
            desc: "spawning increases the clones counter"
          }
        ]
      }
    ]
  }
];

test("effects - spawning", t => {
  run(tests, executeEffect, t);
  t.end();
});
