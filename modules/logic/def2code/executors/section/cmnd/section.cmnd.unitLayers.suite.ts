import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  LINKS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - UnitLayers",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {}
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              UNITLAYERS: "bogusUnitLayers"
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof UNITLAYERS",
                  res: "undefined",
                  desc:
                    "we aren't referencing UNITLAYERS so we don't localize it"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            UNITLAYERS: "bogusUnitLayers",
            step: {
              ...defaultCmndEndContext.step,
              UNITLAYERS: "oldUnitLayers"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "oldUnitLayers",
                  desc:
                    "command doesnt reference UNITLAYERS so we pass old along"
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
              applyEffect: {
                killat: "somemark"
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
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              UNITLAYERS: { existing: "unitLayers" }
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "UNITLAYERS",
                  res: { existing: "unitLayers" },
                  desc: "we're referencing UNITLAYERS so we import it"
                },
                {
                  sample: "UNITLAYERS === references.step.UNITLAYERS",
                  res: true,
                  desc: "we're gonna totally replace, so import reference"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            UNITLAYERS: "localUnitLayers"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "localUnitLayers",
                  desc:
                    "we have local UNITLAYERS reference, so just pass that along"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
