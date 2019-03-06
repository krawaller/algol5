import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolOrderAnon, AlgolWriterSuite } from "../../../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
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
            dirs: ["ortho"],
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
            dirs: { list: [1, 3] },
            starts: { singles: ["mymark", "myothermark"] },
            draw: { neighbours: { tolayer: "flarps" } }
          },
          singleStartMultiDirInclNeighCount: {
            type: "neighbour",
            dirs: ["rose"],
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
            ARTIFACTS: {}
          },
          tests: [
            {
              expr: { generators: ["singleDirAndStartDrawNeighbours"] },
              sample: "ARTIFACTS.flarps",
              res: { a2: {} }
            },
            {
              expr: { generators: ["singleDirAndStartDrawNeighboursAndStart"] },
              sample: "ARTIFACTS",
              res: { flarps: { a2: {} }, blarps: { a1: {} } }
            },
            {
              expr: { generators: ["singleStartOrthoDrawNeighbours"] },
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, b1: {} }
            },
            {
              expr: { generators: ["multiStartsDrawNeighbours"] },
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, b2: {} }
            },
            {
              expr: { generators: ["multiStartMultiDirDrawNeighbours"] },
              sample: "ARTIFACTS.flarps",
              res: { a2: {}, b1: {}, b2: {}, c1: {} }
            },
            {
              expr: { generators: ["singleStartMultiDirInclNeighCount"] },
              sample: "ARTIFACTS.flarps",
              res: { a1: { n: 3 } },
              desc: "We can access neighbour count in start draw"
            }
          ]
        }
      ]
    }
  ]
};
