import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  emptyArtifactLayers: {},
  step: {
    UNITLAYERS: {}
  }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Init",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {
              link: {
                if: [
                  { same: [{ battlevar: "gnurp" }, { turnvar: "flurp" }] },
                  "somemark"
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
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            step: {
              BATTLEVARS: "oldBattleVars",
              UNITLAYERS: {}
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
        }
      ]
    }
  ]
};
