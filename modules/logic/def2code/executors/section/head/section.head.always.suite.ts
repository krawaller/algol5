import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Head - Always",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 1,
          width: 2
        }
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "head",
              naked: true,
              asserts: [
                {
                  sample: "roseDirs",
                  res: [1, 2, 3, 4, 5, 6, 7, 8],
                  desc: "rose dir constant was set up"
                },
                {
                  sample: "orthoDirs",
                  res: [1, 3, 5, 7],
                  desc: "orthogonal dir constant was set up"
                },
                {
                  sample: "diagDirs",
                  res: [2, 4, 6, 8],
                  desc: "diagonal dir constant was set up"
                },
                {
                  sample: "BOARD",
                  res: {
                    board: {
                      a1: { pos: "a1", x: 1, y: 1, colour: "dark" },
                      b1: { pos: "b1", x: 2, y: 1, colour: "light" }
                    },
                    dark: {
                      a1: { pos: "a1", x: 1, y: 1, colour: "dark" }
                    },
                    light: {
                      b1: { pos: "b1", x: 2, y: 1, colour: "light" }
                    }
                  }
                },
                {
                  sample: "connections",
                  res: {
                    a1: {
                      3: "b1"
                    },
                    b1: {
                      7: "a1"
                    },
                    faux: {}
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
