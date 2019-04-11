import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Order - UpdateUnitLayers",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            gnurps: "pawn",
            flurps: "bishop"
          }
        },
        flow: {
          ...emptyFullDef.flow,
          endGame: {
            gnork: {
              condition: {
                isempty: {
                  union: ["myunits", "mygnurps", "flurps", "neutralflurps"]
                }
              }
            }
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            UNITDATA: {
              unit1: { id: "unit1", pos: "a1", group: "gnurps", owner: 1 },
              unit2: { id: "unit2", pos: "b2", group: "flurps", owner: 2 }
            },
            UNITLAYERS: { willbe: "overwritten" }
          },
          tests: [
            {
              expr: ["unitLayers"],
              asserts: [
                {
                  sample: "UNITLAYERS",
                  res: {
                    units: {
                      a1: { id: "unit1", pos: "a1", group: "gnurps", owner: 1 },
                      b2: { id: "unit2", pos: "b2", group: "flurps", owner: 2 }
                    },
                    myunits: {
                      a1: { id: "unit1", pos: "a1", group: "gnurps", owner: 1 }
                    },
                    oppunits: {
                      b2: { id: "unit2", pos: "b2", group: "flurps", owner: 2 }
                    },
                    mygnurps: {
                      a1: { id: "unit1", pos: "a1", group: "gnurps", owner: 1 }
                    },
                    oppgnurps: {},
                    flurps: {
                      b2: { id: "unit2", pos: "b2", group: "flurps", owner: 2 }
                    },
                    neutralflurps: {}
                  },
                  desc: "correctly creates unitlayers for plr1"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
