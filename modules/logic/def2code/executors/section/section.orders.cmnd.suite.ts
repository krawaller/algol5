import { executeSection } from "..";
import { emptyFullDef } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Orders - Command",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            gnurps: "bishop"
          }
        },
        flow: {
          ...emptyFullDef.flow,
          commands: {
            someCmnd: {
              applyEffect: { killid: "unit1" },
              link: "endTurn"
            }
          }
        }
      },
      player: 1,
      action: "someCmnd",
      contexts: [
        {
          context: {
            newStepId: "foo",
            UNITDATA: {
              unit1: { pos: "a2", group: "gnurps", owner: 1 },
              unit2: { pos: "c3", group: "gnurps", foo: "bar", owner: 2 }
            },
            UNITLAYERS: { units: {} },
            LINKS: {}
          },
          tests: [
            {
              expr: "orders",
              asserts: [
                {
                  sample: "LINKS",
                  res: { endTurn: "startTurn2" }
                },
                {
                  sample: "UNITDATA.unit1",
                  res: undefined
                },
                {
                  sample: "UNITLAYERS.units",
                  res: {
                    c3: { pos: "c3", foo: "bar", owner: 2, group: "gnurps" }
                  },
                  desc: "the unit layers were updated"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
