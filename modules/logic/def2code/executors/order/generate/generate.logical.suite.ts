import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Artifacts - Logical",
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
          simpleOrthoReacher: {
            type: "neighbour",
            dirs: "ortho",
            start: "markb2",
            draw: { neighbours: { tolayer: "neighbours" } }
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            MARKS: { markb2: "b2" },
            ARTIFACTS: { neighbours: {} }
          },
          tests: [
            {
              expr: { generators: [{ ifplayer: [1, "simpleOrthoReacher"] }] },
              asserts: [
                {
                  sample: "ARTIFACTS.neighbours",
                  res: { a2: {}, b1: {}, b3: {}, c2: {} },
                  desc: "Generator is run if if is truthy"
                }
              ]
            },
            {
              expr: { generators: [{ ifplayer: [2, "simpleOrthoReacher"] }] },
              asserts: [
                {
                  sample: "ARTIFACTS.neighbours",
                  res: {},
                  desc: "Generator is not run if if is falsy"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
