import { executeOrder } from "../executors";
import { emptyFullDef } from "../../../common";
import { AlgolOrderAnon, AlgolWriterSuite } from "../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
  title: "Artifacts - Walker - Basics",
  func: executeOrder,
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
              expr: { generators: ["singleStartDirDrawSteps"] },
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, a3: {}, a4: {} },
              desc: "A simple walker walks to end"
            },
            {
              expr: { generators: ["singleStartDirInclStepNumber"] },
              sample: "ARTIFACTS.flarps",
              res: { c1: { n: 1 }, d1: { n: 2 } },
              desc: "It can number the steps"
            },
            {
              expr: { generators: ["singleStartDirInclLength"] },
              sample: "ARTIFACTS.flarps",
              res: { a1: { l: 3 } },
              desc: "It can tell total length"
            },
            {
              expr: { generators: ["drawLast"] },
              sample: "ARTIFACTS.flarps",
              res: { a4: {} },
              desc: "It can draw last"
            },
            {
              expr: { generators: ["drawBlocks"] },
              sample: "ARTIFACTS.flarps",
              res: { a3: {}, d4: {} },
              desc: "It draws blocks"
            }
          ]
        }
      ]
    }
  ]
};
