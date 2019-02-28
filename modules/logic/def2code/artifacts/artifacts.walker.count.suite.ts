import { executeOrder } from "../executors";
import { emptyFullDef } from "../../../common";
import { AlgolOrderAnon, AlgolWriterSuite } from "../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
  title: "Artifacts - Walker - Count",
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
              expr: { generators: ["totalCount"] },
              sample: "ARTIFACTS.flarps",
              res: { a1: { total: 2 } },
              desc: "It can count a given set"
            },
            {
              expr: { generators: ["drawCount"] },
              sample: "ARTIFACTS.flarps",
              res: { a2: { total: 2 }, a4: { total: 2 } },
              desc: "It can draw the counted steps"
            },
            {
              expr: { generators: ["totalAndLast"] },
              sample: "ARTIFACTS.flarps",
              res: { a4: { n: 2 } },
              desc: "It can handle last and totalcount"
            },
            {
              expr: { generators: ["countSoFar"] },
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
