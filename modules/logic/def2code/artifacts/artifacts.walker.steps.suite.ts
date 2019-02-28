import { executeGenerator } from ".";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolGenRefAnon, AlgolWriterSuite } from "../../../types";

export const testSuite: AlgolWriterSuite<AlgolGenRefAnon> = {
  title: "Artifacts - Walker - Steps",
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
    }
  ]
};
