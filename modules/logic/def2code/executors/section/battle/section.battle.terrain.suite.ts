import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const board = {
  ...emptyFullDef.board,
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
  title: "Section - Battle - Terrain",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board,
      },
      player: 1,
      action: "battle",
      contexts: [
        {
          context: {
            setup: {},
          },
          envelope: `let game = { action: { startTurn1: a => a } }; let board = ${JSON.stringify(
            board
          )}; `,
          tests: [
            {
              expr: "newBattle",
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
                  desc: "got correct terrain",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
