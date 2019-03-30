import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Init",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            step: {},
            turn: { links: { foo: "bar" } },
            newMarkPos: "b2"
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "LINKS",
                  res: {
                    commands: {},
                    marks: {}
                  },
                  desc: "we reset links for the new step"
                },
                {
                  sample: "typeof ARTIFACTS",
                  res: "undefined",
                  desc: "We didn't defined ARTIFACTS since we didn't need it"
                },
                {
                  sample: "typeof UNITLAYERS",
                  res: "undefined",
                  desc: "We didn't defined UNITLAYERS since we didn't need it"
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
        flow: {
          ...emptyFullDef.flow,
          marks: {
            neatmark: {
              from: "units",
              runGenerator: { if: [{ morethan: [3, ["turn"]] }, "simplereach"] }
            }
          }
        },
        generators: {
          simplereach: {
            type: "neighbour",
            dir: 1,
            starts: "units",
            draw: {
              neighbours: {
                tolayer: "flurps"
              }
            }
          }
        }
      },
      player: 2,
      action: "neatmark",
      contexts: [
        {
          context: {
            step: {
              MARKS: {},
              TURNVARS: "oldTurnVars",
              BATTLEVARS: "oldBattleVars",
              ARTIFACTS: "oldArtifacts",
              UNITLAYERS: "oldUnitLayers",
              TURN: "oldTurnCount"
            },
            newMarkPos: "b2"
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "ARTIFACTS",
                  res: "oldArtifacts"
                },
                {
                  sample: "UNITLAYERS",
                  res: "oldUnitLayers"
                },
                {
                  sample: "TURN",
                  res: "oldTurnCount"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
