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
            lastTurn: { turn: 4 },
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
                  sample: "turn",
                  res: {
                    turn: 5,
                    player: 1,
                    endMarks: {},
                    links: { root: {} },
                    steps: {}
                  }
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
                  sample: "UNITDATA",
                  res: "oldUnitData",
                  desc: "old data was saved into local var"
                },
                {
                  sample: "MARKS",
                  res: {},
                  desc: "initialise marks to empty object"
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
            lastTurn: { turn: 0 },
            step: {
              UNITLAYERS: {},
              TURNVARS: "oldTurnVars",
              BATTLEVARS: "oldBattleVars"
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: "oldTurnVars"
                },
                {
                  sample: "BATTLEVARS",
                  res: "oldBattleVars"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
