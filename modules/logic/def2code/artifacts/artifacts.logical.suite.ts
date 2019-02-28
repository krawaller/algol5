import { executeGenerator } from "./";
import { emptyFullDef } from "../../../common";
import { AlgolGenRefAnon, AlgolWriterSuite } from "../../../types";

export const testSuite: AlgolWriterSuite<AlgolGenRefAnon> = {
  title: "Artifacts - Neighbours",
  func: executeGenerator,
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
            dirs: ["ortho"],
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
              expr: { ifplayer: [1, "simpleOrthoReacher"] },
              sample: "ARTIFACTS.neighbours",
              res: { a2: {}, b1: {}, b3: {}, c2: {} },
              desc: "Generator is run if if is truthy"
            },
            {
              expr: { ifplayer: [2, "simpleOrthoReacher"] },
              sample: "ARTIFACTS.neighbours",
              res: {},
              desc: "Generator is not run if if is falsy"
            }
          ]
        }
      ]
    }
  ]
};
