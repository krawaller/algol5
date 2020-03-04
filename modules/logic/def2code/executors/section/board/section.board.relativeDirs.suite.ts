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
  title: "Section - Board - Relative Dirs",
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
                  sample: "relativeDirs",
                  res: {
                    "1": {
                      "1": 1,
                      "2": 2,
                      "3": 3,
                      "4": 4,
                      "5": 5,
                      "6": 6,
                      "7": 7,
                      "8": 8,
                    },
                    "2": {
                      "1": 2,
                      "2": 3,
                      "3": 4,
                      "4": 5,
                      "5": 6,
                      "6": 7,
                      "7": 8,
                      "8": 1,
                    },
                    "3": {
                      "1": 3,
                      "2": 4,
                      "3": 5,
                      "4": 6,
                      "5": 7,
                      "6": 8,
                      "7": 1,
                      "8": 2,
                    },
                    "4": {
                      "1": 4,
                      "2": 5,
                      "3": 6,
                      "4": 7,
                      "5": 8,
                      "6": 1,
                      "7": 2,
                      "8": 3,
                    },
                    "5": {
                      "1": 5,
                      "2": 6,
                      "3": 7,
                      "4": 8,
                      "5": 1,
                      "6": 2,
                      "7": 3,
                      "8": 4,
                    },
                    "6": {
                      "1": 6,
                      "2": 7,
                      "3": 8,
                      "4": 1,
                      "5": 2,
                      "6": 3,
                      "7": 4,
                      "8": 5,
                    },
                    "7": {
                      "1": 7,
                      "2": 8,
                      "3": 1,
                      "4": 2,
                      "5": 3,
                      "6": 4,
                      "7": 5,
                      "8": 6,
                    },
                    "8": {
                      "1": 8,
                      "2": 1,
                      "3": 2,
                      "4": 3,
                      "5": 4,
                      "6": 5,
                      "7": 6,
                      "8": 7,
                    },
                  },
                  desc: "got correct relativeDirs",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
