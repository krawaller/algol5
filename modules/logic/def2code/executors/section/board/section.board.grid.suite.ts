import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import {
  AlgolStatementSuite,
  AlgolSection,
  AlgolBoardAnon,
} from "../../../../../types";

const board: AlgolBoardAnon = {
  ...emptyFullDef.boards.basic,
  height: 2 as any,
  width: 2 as any,
  grids: {
    somegrid: [
      [1, 2],
      [3, 4],
    ],
  },
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Board - Grid",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        boards: {
          basic: board,
        },
      },
      player: 1,
      action: "board",
      contexts: [
        {
          context: { board },
          envelope:
            "let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions, GRIDS; ",
          tests: [
            {
              expr: "setBoard",
              naked: true,
              asserts: [
                {
                  sample: "GRIDS",
                  res: {
                    somegrid: {
                      a1: 3,
                      a2: 1,
                      b1: 4,
                      b2: 2,
                    },
                  },
                  desc: "got correct GRID",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      def: emptyFullDef,
      player: 1,
      action: "board",
      contexts: [
        {
          context: { board },
          envelope:
            "let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions, GRIDS; ",
          tests: [
            {
              expr: "setBoard",
              naked: true,
              asserts: [
                {
                  sample: "GRIDS",
                  res: undefined,
                  desc: "GRIDS are undefined when no grids in board defs",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
