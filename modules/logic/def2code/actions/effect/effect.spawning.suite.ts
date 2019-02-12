import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../../common";
import { AlgolEffectAnon, TestSuite } from "../../../../types";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Spawning",
  func: executeEffect,
  defs: [
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
              sample: "UNITDATA.spawn1",
              res: {
                id: "spawn1",
                group: "flerps",
                owner: 2,
                baz: "bin",
                pos: "c3"
              },
              desc: "Spawning creates clone with correct characteristics"
            },
            {
              expr: { spawnat: ["othermark", "gnurps"] },
              sample: "UNITDATA.spawn1.owner",
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
              sample: "nextSpawnId",
              res: 2,
              desc: "spawning increases the nextSpawnId counter"
            },
            {
              expr: {
                spawnin: [{ singles: ["othermark", "anothermark"] }, "flurps"]
              },
              sample: "UNITDATA.spawn1",
              res: { id: "spawn1", group: "flurps", owner: 1, pos: "c3" },
              desc: "multispawn created correct first unit"
            },
            {
              expr: {
                spawnin: [{ singles: ["othermark", "anothermark"] }, "flurps"]
              },
              sample: "UNITDATA.spawn2",
              res: { id: "spawn2", group: "flurps", owner: 1, pos: "d4" },
              desc: "multispawn created correct second unit"
            },
            {
              expr: {
                spawnin: [{ singles: ["othermark", "anothermark"] }, "flurps"]
              },
              sample: "nextSpawnId",
              res: 3,
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
              sample: "UNITDATA.spawn2",
              res: {
                id: "spawn2",
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
  ]
};
