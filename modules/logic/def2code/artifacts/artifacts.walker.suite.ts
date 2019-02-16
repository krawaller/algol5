import { executeGenerator } from "./";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { WalkerDefAnon, AlgolWriterSuite } from "../../../types";

export const testSuite: AlgolWriterSuite<WalkerDefAnon> = {
  title: "Artifacts - Walker",
  func: executeGenerator,
  defs: [
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
            },
            {
              expr: {
                type: "walker",
                dir: 1,
                start: "marka1",
                count: { singles: ["marka2", "marka4"] },
                draw: {
                  start: {
                    tolayer: "flarps",
                    include: { total: ["totalcount"] }
                  }
                }
              },
              sample: "ARTIFACTS.flarps",
              res: { a1: { total: 2 } },
              desc: "It can count a given set"
            },
            {
              expr: {
                type: "walker",
                dir: 1,
                start: "marka1",
                count: { singles: ["marka2", "marka4"] },
                draw: {
                  counted: {
                    tolayer: "flarps",
                    include: { total: ["totalcount"] }
                  }
                }
              },
              sample: "ARTIFACTS.flarps",
              res: { a2: { total: 2 }, a4: { total: 2 } },
              desc: "It can draw the counted steps"
            },
            {
              expr: {
                type: "walker",
                dir: 1,
                start: "marka1",
                draw: { last: { tolayer: "flarps" } }
              },
              sample: "ARTIFACTS.flarps",
              res: { a4: {} },
              desc: "It can draw last"
            },
            {
              expr: {
                type: "walker",
                dir: 1,
                start: "marka1",
                count: { singles: ["marka2", "marka4"] },
                draw: {
                  last: { tolayer: "flarps", include: { n: ["totalcount"] } }
                }
              },
              sample: "ARTIFACTS.flarps",
              res: { a4: { n: 2 } },
              desc: "It can handle last and totalcount"
            },
            {
              expr: {
                type: "walker",
                dir: 1,
                start: "marka1",
                startasstep: true,
                count: { singles: ["marka2", "marka4"] },
                draw: {
                  steps: {
                    tolayer: "flarps",
                    include: { now: ["countsofar"] }
                  }
                }
              },
              sample: "ARTIFACTS.flarps",
              res: {
                a1: { now: 0 },
                a2: { now: 1 },
                a3: { now: 1 },
                a4: { now: 2 }
              },
              desc: "It can tell you current count"
            }
          ]
        }
      ]
    }
  ]
};
