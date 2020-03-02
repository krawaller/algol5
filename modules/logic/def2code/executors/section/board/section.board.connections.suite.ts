import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import {
  AlgolStatementSuite,
  AlgolSection,
  AlgolBoardAnon,
} from "../../../../../types";

const board: AlgolBoardAnon = {
  ...emptyFullDef.board,
  height: 2,
  width: 2,
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Board - Connections",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board,
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
                  sample: "connections",
                  res: {
                    faux: {},
                    a1: {
                      1: "a2",
                      2: "b2",
                      3: "b1",
                    },
                    a2: {
                      3: "b2",
                      4: "b1",
                      5: "a1",
                    },
                    b1: {
                      1: "b2",
                      7: "a1",
                      8: "a2",
                    },
                    b2: {
                      5: "b1",
                      6: "a1",
                      7: "a2",
                    },
                  },
                  desc: "got correct connections",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
