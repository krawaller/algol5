import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import {
  AlgolStatementSuite,
  AlgolSection,
  AlgolBoardAnon,
} from "../../../../../types";

const board: AlgolBoardAnon = {
  ...emptyFullDef.boards.basic,
  height: 2,
  width: 2,
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Board - Board",
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
            "let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions; ",
          tests: [
            {
              expr: "setBoard",
              naked: true,
              asserts: [
                {
                  sample: "BOARD",
                  res: {
                    board: {
                      a1: { pos: "a1", x: 1, y: 1, colour: "dark" },
                      a2: { pos: "a2", x: 1, y: 2, colour: "light" },
                      b1: { pos: "b1", x: 2, y: 1, colour: "light" },
                      b2: { pos: "b2", x: 2, y: 2, colour: "dark" },
                    },
                    dark: {
                      a1: { pos: "a1", x: 1, y: 1, colour: "dark" },
                      b2: { pos: "b2", x: 2, y: 2, colour: "dark" },
                    },
                    light: {
                      a2: { pos: "a2", x: 1, y: 2, colour: "light" },
                      b1: { pos: "b1", x: 2, y: 1, colour: "light" },
                    },
                  },
                  desc: "got correct BOARD",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
