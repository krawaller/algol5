import { executeSection } from "..";
import { emptyFullDef, truthy, falsy } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - End",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: {}
        },
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            flurps: "bishop",
            gnurps: "king"
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            turn: {
              steps: {}
            },
            ARTIFACTS: "localArtifacts",
            UNITDATA: "localUnitData",
            UNITLAYERS: "localUnitLayers",
            MARKS: "localMarks"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "turn.steps.root",
                  res: truthy,
                  desc: "A new step was saved as root"
                },
                {
                  sample: "turn.steps.root.ARTIFACTS",
                  res: "localArtifacts"
                },
                {
                  sample: "turn.steps.root.UNITLAYERS",
                  res: "localUnitLayers"
                },
                {
                  sample: "turn.steps.root.UNITDATA",
                  res: "localUnitData"
                },
                {
                  sample: "turn.steps.root.MARKS",
                  res: "localMarks"
                },
                {
                  sample: "turn.steps.root.name",
                  res: "start"
                },
                {
                  sample: "turn.steps.root.path",
                  res: []
                },
                {
                  sample: "turn.steps.root.TURNVARS",
                  res: falsy
                },
                {
                  sample: "turn.steps.root.BATTLEVARS",
                  res: falsy
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
          startTurn: {
            link: {
              if: [
                { same: [{ battlevar: "gnurp" }, { turnvar: "flurp" }] },
                "somemark"
              ]
            }
          }
        }
      },
      action: "start",
      player: 2,
      contexts: [
        {
          context: {
            ARTIFACTS: "localArtifacts",
            UNITDATA: "localUnitData",
            UNITLAYERS: "localUnitLayers",
            MARKS: "localMarks",
            TURNVARS: "localTurnVars",
            BATTLEVARS: "localBattleVars",
            turn: {
              steps: {}
            }
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "turn.steps.root.TURNVARS",
                  res: "localTurnVars"
                },
                {
                  sample: "turn.steps.root.BATTLEVARS",
                  res: "localBattleVars"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
