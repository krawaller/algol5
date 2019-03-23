import { executeSection } from "..";
import { emptyFullDef } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Init",
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
            emptyArtifactLayers: { empty: "layers" },
            step: {
              UNITLAYERS: {
                units: "willstayunits",
                myunits: "shouldbecomeoppunits",
                oppunits: "shouldbecomemyunits",
                flurps: "willstayflurps",
                myflurps: "shouldbecomeoppflurps",
                oppflurps: "shouldbecomemyflurps",
                gnurps: "willstaygnurps",
                mygnurps: "shouldbecomeoppgnurps",
                oppgnurps: "shouldbecomemygnurps"
              },
              UNITDATA: "oldUnitData"
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "UNITLAYERS",
                  res: {
                    units: "willstayunits",
                    oppunits: "shouldbecomeoppunits",
                    myunits: "shouldbecomemyunits",
                    flurps: "willstayflurps",
                    oppflurps: "shouldbecomeoppflurps",
                    myflurps: "shouldbecomemyflurps",
                    gnurps: "willstaygnurps",
                    oppgnurps: "shouldbecomeoppgnurps",
                    mygnurps: "shouldbecomemygnurps"
                  }
                },
                {
                  sample: "ARTIFACTS",
                  res: { empty: "layers" }
                },
                {
                  sample: "typeof TURNVARS",
                  res: "undefined",
                  desc: "we didn't define turnvars since we didn't need them"
                },
                {
                  sample: "typeof BATTLEVARS",
                  res: "undefined",
                  desc: "we didn't define battlevars since we didn't need them"
                },
                {
                  sample: "typeof TURN",
                  res: "undefined",
                  desc: "we didn't define turn since we didn't need them"
                },
                {
                  sample: "typeof NEXTSPAWNID",
                  res: "undefined"
                },
                {
                  sample: "UNITDATA",
                  res: "oldUnitData",
                  desc: "old data was saved into local var"
                },
                {
                  sample: "MARKS",
                  res: {},
                  desc: "initialise marks to empty object"
                },
                {
                  sample: "LINKS",
                  res: {
                    commands: {},
                    marks: {}
                  },
                  desc: "initialise LINKS to correct empty object"
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
          endGame: {
            fnurp: {
              condition: { same: [5, ["turn"]] }
            }
          },
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
            emptyArtifactLayers: {},
            step: {
              UNITLAYERS: {},
              BATTLEVARS: "oldBattleVars",
              NEXTSPAWNID: "oldNextSpawnId",
              TURN: 7
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: {},
                  desc:
                    "Since this is start, turnvars are set to an empty object"
                },
                {
                  sample: "BATTLEVARS",
                  res: "oldBattleVars"
                },
                {
                  sample: "NEXTSPAWNID",
                  res: "oldNextSpawnId"
                },
                {
                  sample: "TURN",
                  res: 8,
                  desc: "turn from last step was bumped once"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
