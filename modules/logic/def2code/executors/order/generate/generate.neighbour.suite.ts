import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Artifacts - Neighbours",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 3,
          width: 3
        },
        generators: {
          singleDirAndStartDrawNeighbours: {
            type: "neighbour",
            dir: 1,
            start: "mymark",
            draw: { neighbours: { tolayer: "flarps" } }
          },
          singleDirAndStartDrawNeighboursAndStart: {
            type: "neighbour",
            dir: 1,
            start: "mymark",
            draw: {
              neighbours: { tolayer: "flarps" },
              start: { tolayer: "blarps" }
            }
          },
          singleStartOrthoDrawNeighbours: {
            type: "neighbour",
            dirs: "ortho",
            start: "mymark",
            draw: { neighbours: { tolayer: "flarps" } }
          },
          multiStartsDrawNeighbours: {
            type: "neighbour",
            dir: 1,
            starts: { singles: ["mymark", "myothermark"] },
            draw: { neighbours: { tolayer: "flarps" } }
          },
          multiStartMultiDirDrawNeighbours: {
            type: "neighbour",
            dirs: [1, 3],
            starts: { singles: ["mymark", "myothermark"] },
            draw: { neighbours: { tolayer: "flarps" } }
          },
          singleStartMultiDirInclNeighCount: {
            type: "neighbour",
            dirs: "rose",
            start: "mymark",
            draw: {
              start: {
                tolayer: "flarps",
                include: { n: ["neighbourcount"] }
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
            MARKS: { mymark: "a1", myothermark: "b1" },
            ARTIFACTS: { flarps: {}, blarps: {} }
          },
          tests: [
            {
              expr: { generators: ["singleDirAndStartDrawNeighbours"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a2: {} }
                }
              ]
            },
            {
              expr: { generators: ["singleDirAndStartDrawNeighboursAndStart"] },
              asserts: [
                {
                  sample: "ARTIFACTS",
                  res: { flarps: { a2: {} }, blarps: { a1: {} } }
                }
              ]
            },
            {
              expr: { generators: ["singleStartOrthoDrawNeighbours"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a2: {}, b1: {} }
                }
              ]
            },
            {
              expr: { generators: ["multiStartsDrawNeighbours"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a2: {}, b2: {} }
                }
              ]
            },
            {
              expr: { generators: ["multiStartMultiDirDrawNeighbours"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a2: {}, b1: {}, b2: {}, c1: {} }
                }
              ]
            },
            {
              expr: { generators: ["singleStartMultiDirInclNeighCount"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a1: { n: 3 } },
                  desc: "We can access neighbour count in start draw"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
