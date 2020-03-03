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
  terrain: {
    flurp: {
      1: ["a1"],
      2: ["b2"],
    },
  },
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Board - Terrain",
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
                  sample: "TERRAIN1",
                  res: {
                    flurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 },
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 },
                    },
                    myflurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 },
                    },
                    oppflurp: {
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 },
                    },
                    noflurp: {
                      a2: { pos: "a2", x: 1, y: 2 },
                      b1: { pos: "b1", x: 2, y: 1 },
                    },
                  },
                  desc: "got correct terrain1",
                },
                {
                  sample: "TERRAIN2",
                  res: {
                    flurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 },
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 },
                    },
                    oppflurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 },
                    },
                    myflurp: {
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 },
                    },
                    noflurp: {
                      a2: { pos: "a2", x: 1, y: 2 },
                      b1: { pos: "b1", x: 2, y: 1 },
                    },
                  },
                  desc: "got correct terrain2",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
