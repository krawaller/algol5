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
            expr: { killat: "unit1mark" },
            sample: "UNITDATA.unit2 && !UNITDATA.unit1",
            res: truthy
          },
          {
            expr: { killid: "unit1" },
            sample: "UNITDATA.unit1",
            res: falsy
          },
          {
            expr: { killid: { value: "unit1" } },
            sample: "UNITDATA.unit1",
            res: falsy
          },
          {
            expr: { forposin: ["unit1terrain", { killat: ["looppos"] }] },
            sample: "!UNITDATA.unit1 && UNITDATA.unit2",
            res: truthy
          },
          {
            expr: { multi: [{ killid: "unit2" }, { killid: "unit1" }] },
            sample: "UNITDATA.unit1 || UNITDATA.unit2",
            res: falsy
          },
          {
            expr: { killin: "unit1terrain" },
            sample: "!UNITDATA.unit1 && UNITDATA.unit2",
            res: truthy
          },
          {
            expr: { foridin: ["unit1terrain", { killid: ["loopid"] }] },
            sample: "!UNITDATA.unit1 && UNITDATA.unit2",
            res: truthy
          },
          {
            expr: { foridin: ["units", { killid: ["loopid"] }] },
            sample: "UNITDATA",
            res: {}
          },
          {
            expr: { setat: ["unit1mark", { value: "prop" }, { value: "wee" }] },
            sample: "UNITDATA.unit1.prop",
            res: "wee"
          },
          {
            expr: { setin: ["unit1terrain", "prop", "wee"] },
            sample: "UNITDATA.unit1.prop",
            res: "wee"
          },
          {
            expr: { setid: ["unit2", "prop", "wee"] },
            sample: "UNITDATA.unit2.prop",
            res: "wee"
          },
          {
            expr: { moveat: ["unit1mark", "othermark"] },
            sample: "UNITDATA.unit1.pos",
            res: "c3"
          },
          {
            expr: { moveid: [{ value: "unit1" }, "othermark"] },
            sample: "UNITDATA.unit1.pos",
            res: "c3"
          },
          {
            expr: { stompat: ["unit1mark", "unit2mark"] },
            sample: "UNITDATA.unit1.pos === 'b2' && !UNITDATA.unit2",
            res: truthy
          },
          {
            expr: { stompid: [{ value: "unit1" }, "unit2mark"] },
            sample: "UNITDATA.unit1.pos === 'b2' && !UNITDATA.unit2",
            res: truthy
          },
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

test("effects", t => {
  run(tests, executeEffect, t);
  t.end();
});
