import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndEndContext = {
  step: { path: [] },
  MARKS: {},
  LINKS: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - End - Variables",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              path: [],
              TURNVAR: "bogusTurnVar",
              BATTLEVAR: "bogusBattleVar"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
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
          commands: {
            somecmnd: {},
            othercmnd: {
              applyEffect: {
                setbattlevar: ["gnurp", { turnvar: "flurp" }]
              }
            }
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              path: [],
              TURNVARS: "oldTurnVars",
              BATTLEVARS: "oldBattleVars"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
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
          commands: {
            somecmnd: {
              applyEffects: [
                { setbattlevar: ["mybvar", { turnvar: "myturnvar" }] }
              ]
            }
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndEndContext,
            TURNVARS: "referencedTurnVars",
            BATTLEVARS: "mutatedBattleVars"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: "referencedTurnVars",
                  desc: "we have local reference so we keep it"
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: "mutatedBattleVars",
                  desc: "we have local mutated reference so we keep it"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
