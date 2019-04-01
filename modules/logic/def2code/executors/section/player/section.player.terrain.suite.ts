import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Player - Terrain",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          terrain: {
            flurp: ["a1"]
          }
        }
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "player",
              naked: true,
              asserts: [
                {
                  sample: "typeof TERRAIN",
                  res: "undefined",
                  desc: "Terrain is neutral, so not defined in player closure"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 2,
          width: 2,
          terrain: {
            flurp: {
              1: ["a1"],
              2: ["b2"]
            }
          }
        }
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "player",
              player: 1,
              naked: true,
              asserts: [
                {
                  sample: "TERRAIN",
                  res: {
                    flurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 },
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 }
                    },
                    myflurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 }
                    },
                    oppflurp: {
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 }
                    },
                    noflurp: {
                      a2: { pos: "a2", x: 1, y: 2 },
                      b1: { pos: "b1", x: 2, y: 1 }
                    }
                  },
                  desc: "Terrain is NOT neutral, so defined here"
                }
              ]
            },
            {
              expr: "player",
              player: 2,
              naked: true,
              asserts: [
                {
                  sample: "TERRAIN",
                  res: {
                    flurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 },
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 }
                    },
                    oppflurp: {
                      a1: { owner: 1, pos: "a1", x: 1, y: 1 }
                    },
                    myflurp: {
                      b2: { owner: 2, pos: "b2", x: 2, y: 2 }
                    },
                    noflurp: {
                      a2: { pos: "a2", x: 1, y: 2 },
                      b1: { pos: "b1", x: 2, y: 1 }
                    }
                  },
                  desc: "flipped terrain for plr2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
