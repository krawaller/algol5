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
          swamp: ["a1"]
        }
      }
    },
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {
          UNITDATA: {
            foo: { survivor: true, pos: "b2" },
            killme: { pos: "a1" }
          },
          UNITLAYERS: {
            units: { a1: { id: "killme" }, b2: { id: "foo" } }
          },
          MARKS: { mymark: "a1", othermark: "c3", thirdmark: "b2" },
          TERRAIN: { swamp: { a1: {} } },
          clones: 2
        },
        tests: [
          {
            expr: { killat: "mymark" },
            sample: "UNITDATA",
            res: { foo: { survivor: true, pos: "b2" } }
          },
          {
            expr: { killid: "killme" },
            sample: "UNITDATA.killme",
            res: falsy
          },
          {
            expr: { killid: { value: "killme" } },
            sample: "UNITDATA.killme",
            res: falsy
          },
          {
            expr: { forposin: ["swamp", { killat: ["looppos"] }] },
            sample: "!UNITDATA.killme && UNITDATA.foo",
            res: truthy
          },
          {
            expr: { multi: [{ killid: "foo" }, { killid: "killme" }] },
            sample: "UNITDATA.killme || UNITDATA.foo",
            res: falsy
          },
          {
            expr: { killin: "swamp" },
            sample: "!UNITDATA.killme && UNITDATA.foo",
            res: truthy
          },
          {
            expr: { foridin: ["swamp", { killid: ["loopid"] }] },
            sample: "!UNITDATA.killme && UNITDATA.foo",
            res: truthy
          },
          {
            expr: { foridin: ["units", { killid: ["loopid"] }] },
            sample: "UNITDATA",
            res: {}
          },
          {
            expr: { setat: ["mymark", { value: "prop" }, { value: "wee" }] },
            sample: "UNITDATA.killme.prop",
            res: "wee"
          },
          {
            expr: { setin: ["swamp", "prop", "wee"] },
            sample: "UNITDATA.killme.prop",
            res: "wee"
          },
          {
            expr: { setid: ["foo", "prop", "wee"] },
            sample: "UNITDATA.foo.prop",
            res: "wee"
          },
          {
            expr: { moveat: ["mymark", "othermark"] },
            sample: "UNITDATA.killme.pos",
            res: "c3"
          },
          {
            expr: { moveid: [{ value: "killme" }, "othermark"] },
            sample: "UNITDATA.killme.pos",
            res: "c3"
          },
          {
            expr: { stompat: ["mymark", "thirdmark"] },
            sample: "UNITDATA.killme.pos === 'b2' && !UNITDATA.foo",
            res: truthy
          },
          {
            expr: { stompid: [{ value: "killme" }, "thirdmark"] },
            sample: "UNITDATA.killme.pos === 'b2' && !UNITDATA.foo",
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
