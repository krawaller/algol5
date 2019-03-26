import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkEndContext = {
  MARKS: {},
  LINKS: {},
  step: { path: [] },
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - End - Variables",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: { from: "units" }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultMarkEndContext,
            step: {
              path: [],
              TURNVAR: "bogusTurnVar",
              BATTLEVAR: "bogusBattleVar"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVAR",
                  res: undefined,
                  desc: "Game doesnt use TURNVAR so we dont pass it on"
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
          marks: {
            somemark: { from: "units" },
            othermark: {
              from: "units",
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
            ...defaultMarkEndContext,
            step: {
              path: [],
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
          marks: {
            somemark: {
              from: "units",
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
