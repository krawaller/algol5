import { executeEffect } from "../def2code2/actions/effect";
import { emptyFullDef } from "../../common";
import { AlgolEffectAnon } from "../../types";
import { run, ParserTest, truthy, falsy } from "./utils";

import * as test from "tape";

const tests: ParserTest<AlgolEffectAnon>[] = [
  {
    def: emptyFullDef,
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {
          UNITDATA: { unit1: { id: "unit1" } },
          MARKS: { othermark: "c3", anothermark: "d4" },
          clones: 2
        },
        tests: [
          {
            expr: {
              spawnat: [
                "othermark",
                "flerps",
                ["otherplayer"],
                { baz: { value: "bin" } }
              ]
            },
            sample: "UNITDATA.clone3",
            res: {
              id: "clone3",
              group: "flerps",
              owner: 2,
              baz: "bin",
              pos: "c3"
            },
            desc: "Spawning creates clone with correct characteristics"
          },
          {
            expr: { spawnat: ["othermark", "gnurps"] },
            sample: "UNITDATA.clone3.owner",
            res: 1,
            desc: "Spawning defaults owner to current player if none provided"
          },
          {
            expr: { spawnat: ["othermark", "gnurps"] },
            sample: "UNITDATA.unit1",
            res: { id: "unit1" },
            desc: "Spawning doesn't affect already existing units"
          },
          {
            expr: {
              spawnat: ["othermark", "flerps", 1, { baz: { value: "bin" } }]
            },
            sample: "clones",
            res: 3,
            desc: "spawning increases the clones counter"
          },
          {
            expr: {
              spawnin: [{ singles: ["othermark", "anothermark"] }, "flurps"]
            },
            sample: "UNITDATA.clone3",
            res: { id: "clone3", group: "flurps", owner: 1, pos: "c3" },
            desc: "multispawn created correct first unit"
          },
          {
            expr: {
              spawnin: [{ singles: ["othermark", "anothermark"] }, "flurps"]
            },
            sample: "UNITDATA.clone4",
            res: { id: "clone4", group: "flurps", owner: 1, pos: "d4" },
            desc: "multispawn created correct second unit"
          },
          {
            expr: {
              spawnin: [{ singles: ["othermark", "anothermark"] }, "flurps"]
            },
            sample: "clones",
            res: 4,
            desc: "multispawn increased counter by total number of spawns"
          },
          {
            expr: {
              spawnin: [
                { singles: ["othermark", "anothermark"] },
                "flurps",
                ["otherplayer"],
                { foo: { value: "bar" } }
              ]
            },
            sample: "UNITDATA.clone4",
            res: {
              id: "clone4",
              group: "flurps",
              owner: 2,
              pos: "d4",
              foo: "bar"
            },
            desc: "multispawn supports passing owner and props"
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
