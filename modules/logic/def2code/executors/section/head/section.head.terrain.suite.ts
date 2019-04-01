import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Head - Terrain",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 1,
          width: 2,
          terrain: {
            gnurp: ["a1"]
          }
        }
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "head",
              asserts: [
                {
                  sample: "TERRAIN",
                  res: {
                    gnurp: {
                      a1: { pos: "a1", x: 1, y: 1 }
                    },
                    nognurp: {
                      b1: { pos: "b1", x: 2, y: 1 }
                    }
                  },
                  desc: "Terrain was set up since it is player neutral"
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
          height: 1,
          width: 2,
          terrain: {
            gnurp: {
              1: ["a1"]
            }
          }
        }
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "head",
              asserts: [
                {
                  sample: "typeof TERRAIN",
                  res: "undefined",
                  desc:
                    "Since terrain is plr specific we don't define it here in head"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
