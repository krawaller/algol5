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
            MARKS: "localMarks",
            LINKS: "localLinks"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal",
                  res: truthy,
                  desc: "A new step was saved as root"
                },
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "localArtifacts"
                },
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "localUnitLayers"
                },
                {
                  sample: "returnVal.UNITDATA",
                  res: "localUnitData"
                },
                {
                  sample: "returnVal.MARKS",
                  res: "localMarks"
                },
                {
                  sample: "returnVal.LINKS",
                  res: "localLinks"
                },
                {
                  sample: "returnVal.name",
                  res: "start"
                },
                {
                  sample: "returnVal.path",
                  res: []
                },
                {
                  sample: "returnVal.TURNVARS",
                  res: falsy
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: falsy
                },
                {
                  sample: "returnVal.NEXTSPAWNID",
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
          },
          commands: {
            somecmnd: {
              applyEffect: { spawnat: ["somemark", "gnurps"] }
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
            LINKS: "localLinks",
            TURNVARS: "localTurnVars",
            BATTLEVARS: "localBattleVars",
            NEXTSPAWNID: "localNextSpawnId",
            turn: {
              steps: {}
            }
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: "localTurnVars"
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: "localBattleVars"
                },
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: "localNextSpawnId"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
