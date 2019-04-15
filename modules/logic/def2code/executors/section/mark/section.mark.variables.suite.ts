import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkInitContext = {
  newMarkPos: "",
  step: {}
};

const defaultMarkEndContext = {
  MARKS: {},
  LINKS: {},
  step: {},
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Variables",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: { link: "somemark" },
          marks: {
            somemark: { from: "units" }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: defaultMarkInitContext,
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "typeof TURNVARS",
                  res: "undefined",
                  desc: "We don't use TURNVARS so we dont init"
                },
                {
                  sample: "typeof BATTLEVARS",
                  res: "undefined",
                  desc: "We don't use use BATTLEVARS so we dont pass it on"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            step: {
              TURNVAR: "bogusTurnVar",
              BATTLEVAR: "bogusBattleVar"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: undefined,
                  desc: "Game doesnt use TURNVARS so we dont pass it on"
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: undefined,
                  desc: "Game doesnt use BATTLEVARS so we dont pass it on"
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
          startTurn: { link: "somemark" },
          marks: {
            somemark: { from: "units" },
            othermark: {
              from: "units",
              link: {
                if: [
                  { same: [{ turnvar: "foo" }, { battlevar: "bar" }] },
                  "endTurn"
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
          context: defaultMarkInitContext,
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "typeof TURNVARS",
                  res: "undefined",
                  desc:
                    "We don't use TURNVAR so we dont init (but they're used elsewhere in the game)"
                },
                {
                  sample: "typeof BATTLEVARS",
                  res: "undefined",
                  desc:
                    "We don't use BATTLEVAR so we dont init (but they're used elsewhere in the game)"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            step: {
              TURNVARS: "oldTurnVars",
              BATTLEVARS: "oldBattleVars"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: "oldTurnVars",
                  desc: "no local turnvars, we just pass on from the old step"
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
          startTurn: { link: "somemark" },
          marks: {
            somemark: {
              from: "units",
              link: {
                if: [
                  { same: [{ turnvar: "foo" }, { battlevar: "bar" }] },
                  "endTurn"
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
            ...defaultMarkInitContext,
            step: {
              TURNVARS: "oldTurnVars",
              BATTLEVARS: "oldBattleVars"
            }
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: "oldTurnVars",
                  desc: "TURNVARS are used locally so we import them"
                },
                {
                  sample: "BATTLEVARS",
                  res: "oldBattleVars",
                  desc: "BATTLEVARS are used locally so we import them"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            TURNVARS: "referencedTurnVars",
            BATTLEVARS: "referencedBattleVars"
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: "referencedTurnVars",
                  desc: "we have local reference so we keep it"
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: "referencedBattleVars",
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
