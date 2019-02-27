import { executeGenerator } from ".";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolGenRefAnon, AlgolWriterSuite } from "../../../types";

export const testSuite: AlgolWriterSuite<AlgolGenRefAnon> = {
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
        },
        generators: {
          singleStartDirDrawSteps: {
            type: "walker",
            dir: 1,
            start: "marka1",
            draw: { steps: { tolayer: "flarps" } }
          },
          singleStartDirInclStepNumber: {
            type: "walker",
            dir: 3,
            start: "markb1",
            draw: { steps: { tolayer: "flarps", include: { n: ["step"] } } }
          },
          singleStartDirInclLength: {
            type: "walker",
            dir: 1,
            start: "marka1",
            draw: {
              start: { tolayer: "flarps", include: { l: ["walklength"] } }
            }
          },
          drawLast: {
            type: "walker",
            dir: 1,
            start: "marka1",
            draw: { last: { tolayer: "flarps" } }
          },
          drawBlocks: {
            type: "walker",
            dirs: ["rose"],
            start: "marka1",
            blocks: { singles: ["marka3", "marka4", "markd4"] },
            draw: { block: { tolayer: "flarps" } }
          }
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
              expr: "singleStartDirDrawSteps",
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, a3: {}, a4: {} },
              desc: "A simple walker walks to end"
            },
            {
              expr: "singleStartDirInclStepNumber",
              sample: "ARTIFACTS.flarps",
              res: { c1: { n: 1 }, d1: { n: 2 } },
              desc: "It can number the steps"
            },
            {
              expr: "singleStartDirInclLength",
              sample: "ARTIFACTS.flarps",
              res: { a1: { l: 3 } },
              desc: "It can tell total length"
            },
            {
              expr: "drawLast",
              sample: "ARTIFACTS.flarps",
              res: { a4: {} },
              desc: "It can draw last"
            },
            {
              expr: "drawBlocks",
              sample: "ARTIFACTS.flarps",
              res: { a3: {}, d4: {} },
              desc: "It draws blocks"
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
          height: 4,
          width: 4
        },
        generators: {
          withSteps: {
            type: "walker",
            dir: 1,
            start: "marka1",
            steps: { singles: ["marka2", "marka3"] },
            draw: { steps: { tolayer: "flarps" } }
          },
          startAsStep: {
            type: "walker",
            dir: 1,
            start: "marka1",
            startasstep: true,
            steps: { singles: ["marka1", "marka2", "marka3"] },
            draw: { steps: { tolayer: "flarps" } }
          },
          startAsStepWithCount: {
            type: "walker",
            dir: 1,
            start: "marka1",
            startasstep: true,
            steps: { singles: ["marka1", "marka2", "marka3"] },
            draw: { steps: { tolayer: "flarps", include: { n: ["step"] } } }
          },
          startAsStepNoSteps: {
            type: "walker",
            dir: 1,
            start: "marka1",
            startasstep: true,
            steps: { single: "marka2" },
            draw: { steps: { tolayer: "flarps" } }
          },
          stepsBeforeBlocks: {
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
          blocksBeforeSteps: {
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
          }
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
              expr: "withSteps",
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, a3: {} },
              desc: "It doesnt mark beyond given steps"
            },
            {
              expr: "startAsStep",
              sample: "ARTIFACTS.flarps",
              res: { a1: {}, a2: {}, a3: {} },
              desc: "It can be told to include start in steps"
            },
            {
              expr: "startAsStepWithCount",
              sample: "ARTIFACTS.flarps",
              res: { a1: { n: 1 }, a2: { n: 2 }, a3: { n: 3 } },
              desc: "Stepcount is adjusted when including start in steps"
            },
            {
              expr: "startAsStepNoSteps",
              sample: "ARTIFACTS.flarps",
              res: undefined,
              desc:
                "If include start as step and no step at start, it draws nothing"
            },
            {
              expr: "stepsBeforeBlocks",
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, a1: { because: "nomoresteps" } },
              desc: "It checks steps before blocks by default"
            },
            {
              expr: "blocksBeforeSteps",
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, a1: { because: "hitblock" } },
              desc: "It can be told to check blocks before steps"
            }
          ]
        }
      ]
    },
    // -------------------------- COUNT -----------------------
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 4,
          width: 4
        },
        generators: {
          totalCount: {
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
          drawCount: {
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
          totalAndLast: {
            type: "walker",
            dir: 1,
            start: "marka1",
            count: { singles: ["marka2", "marka4"] },
            draw: {
              last: { tolayer: "flarps", include: { n: ["totalcount"] } }
            }
          },
          countSoFar: {
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
          }
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
              expr: "totalCount",
              sample: "ARTIFACTS.flarps",
              res: { a1: { total: 2 } },
              desc: "It can count a given set"
            },
            {
              expr: "drawCount",
              sample: "ARTIFACTS.flarps",
              res: { a2: { total: 2 }, a4: { total: 2 } },
              desc: "It can draw the counted steps"
            },
            {
              expr: "totalAndLast",
              sample: "ARTIFACTS.flarps",
              res: { a4: { n: 2 } },
              desc: "It can handle last and totalcount"
            },
            {
              expr: "countSoFar",
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
