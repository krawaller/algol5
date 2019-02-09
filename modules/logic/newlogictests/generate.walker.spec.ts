import { executeGenerator } from "../def2code2/artifacts";
import { emptyFullDef } from "../../common";
import { WalkerDefAnon } from "../../types";
import { run, ParserTest } from "./utils";

import * as test from "tape";

const tests: ParserTest<WalkerDefAnon>[] = [
  {
    def: {
      ...emptyFullDef,
      board: {
        ...emptyFullDef.board,
        height: 4,
        width: 4
      }
    },
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: {
          MARKS: {
            marka1: "a1",
            marka2: "a2",
            marka3: "a3",
            marka4: "a4",
            markb1: "b1",
            markd4: "d4"
          },
          ARTIFACTS: {}
        },
        tests: [
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              draw: { steps: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a2: {}, a3: {}, a4: {} },
            desc: "A simple walker walks to end"
          },
          {
            expr: {
              type: "walker",
              dir: 3,
              start: "markb1",
              draw: { steps: { tolayer: "flarps", include: { n: ["step"] } } }
            },
            sample: "ARTIFACTS.flarps",
            res: { c1: { n: 1 }, d1: { n: 2 } },
            desc: "It can number the steps"
          },
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              draw: {
                start: { tolayer: "flarps", include: { l: ["walklength"] } }
              }
            },
            sample: "ARTIFACTS.flarps",
            res: { a1: { l: 3 } },
            desc: "It can tell total length"
          },
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              steps: { singles: ["marka2", "marka3"] },
              draw: { steps: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a2: {}, a3: {} },
            desc: "It doesnt mark beyond given steps"
          },
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              startasstep: true,
              steps: { singles: ["marka1", "marka2", "marka3"] },
              draw: { steps: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a1: {}, a2: {}, a3: {} },
            desc: "It can be told to include start in steps"
          },
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              startasstep: true,
              steps: { singles: ["marka1", "marka2", "marka3"] },
              draw: { steps: { tolayer: "flarps", include: { n: ["step"] } } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a1: { n: 1 }, a2: { n: 2 }, a3: { n: 3 } },
            desc: "Stepcount is adjusted when including start in steps"
          },
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              startasstep: true,
              steps: { single: "marka2" },
              draw: { steps: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: undefined,
            desc:
              "If include start as step and no step at start, it draws nothing"
          },
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              steps: { single: "marka2" },
              blocks: { single: "marka3" },
              draw: {
                steps: { tolayer: "flarps" },
                start: {
                  tolayer: "flarps",
                  include: { because: ["stopreason"] }
                }
              }
            },
            sample: "ARTIFACTS.flarps",
            res: { a2: {}, a1: { because: "nomoresteps" } },
            desc: "It checks steps before blocks by default"
          },
          {
            expr: {
              type: "walker",
              dir: 1,
              start: "marka1",
              steps: { single: "marka2" },
              blocks: { single: "marka3" },
              testblocksbeforesteps: true,
              draw: {
                steps: { tolayer: "flarps" },
                start: {
                  tolayer: "flarps",
                  include: { because: ["stopreason"] }
                }
              }
            },
            sample: "ARTIFACTS.flarps",
            res: { a2: {}, a1: { because: "hitblock" } },
            desc: "It can be told to check blocks before steps"
          },
          {
            expr: {
              type: "walker",
              dirs: ["rose"],
              start: "marka1",
              blocks: { singles: ["marka3", "marka4", "markd4"] },
              draw: { block: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a3: {}, d4: {} },
            desc: "It draws blocks"
          }
        ]
      }
    ]
  }
];

test("generate - walkers", t => {
  run(tests, executeGenerator, t);
  t.end();
});
