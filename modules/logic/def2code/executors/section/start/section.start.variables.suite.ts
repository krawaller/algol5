import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  emptyArtifactLayers: {},
  step: {
    UNITLAYERS: {}
  }
};

const defaultStartEndContext = {
  emptyArtifactLayers: {},
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Variables",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "start",
      contexts: [
        {
          context: defaultStartInitContext,
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "typeof TURNVARS",
                  res: "undefined",
                  desc:
                    "we didn't define turnvars since we didn't use them locally"
                },
                {
                  sample: "typeof BATTLEVARS",
                  res: "undefined",
                  desc:
                    "we didn't define battlevars since we didn't use them locally"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
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
      action: "start",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
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
      action: "start",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            step: {
              ...defaultStartInitContext.step,
              BATTLEVARS: "oldBattleVars",
              TURNVARS: "bogusTurnVars"
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
                    "We're using TURNVARS locally, so initiate to empty object here"
                },
                {
                  sample: "BATTLEVARS",
                  res: "oldBattleVars",
                  desc: "we're using BATTLEVARS locally, so reference them here"
                }
              ]
            }
          ]
        },
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
