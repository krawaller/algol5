import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartEndContext = {
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - End - Variables",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            step: {
              path: [],
              BATTLEVAR: "bogusBattleVar"
            }
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVAR",
                  res: undefined,
                  desc: "Game doesnt use TURNVAR so we dont init it"
                },
                {
                  sample: "returnVal.BATTLEVAR",
                  res: undefined,
                  desc: "Game doesnt use BATTLEVAR so we dont pass it on"
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
          commands: {
            somecmnd: {
              link: {
                if: [
                  { same: [{ turnvar: "foo" }, { battlevar: "bar" }] },
                  "endturn"
                ]
              }
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            step: {
              path: [],
              BATTLEVARS: "oldBattleVars"
            }
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: {},
                  desc:
                    "no local turnvars, but game uses it so we init to empty object here"
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: "oldBattleVars",
                  desc: "no local battlevars, we just pass on from the old step"
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
                { same: [{ turnvar: "foo" }, { battlevar: "bar" }] },
                "endturn"
              ]
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            TURNVARS: "localTurnVars",
            BATTLEVARS: "localBattleVars"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: "localTurnVars",
                  desc:
                    "we have local reference to new empty object so we keep it"
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: "localBattleVars",
                  desc: "we have local reference so we keep it"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
