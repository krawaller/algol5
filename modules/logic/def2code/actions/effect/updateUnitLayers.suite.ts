import { executeOrder } from "../../executors";
import { emptyFullDef } from "../../../../common";
import { AlgolWriterSuite, AlgolOrderAnon } from "../../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
  title: "Effect - UpdateUnitLayers",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            gnurps: "pawns",
            flurps: "bishops"
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
            }
          },
          tests: [
            {
              expr: ["unitLayers"],
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
                neutralunits: {},
                gnurps: {
                  a1: { id: "unit1", pos: "a1", group: "gnurps", owner: 1 }
                },
                mygnurps: {
                  a1: { id: "unit1", pos: "a1", group: "gnurps", owner: 1 }
                },
                oppgnurps: {},
                neutralgnurps: {},
                flurps: {
                  b2: { id: "unit2", pos: "b2", group: "flurps", owner: 2 }
                },
                myflurps: {},
                oppflurps: {
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
};
