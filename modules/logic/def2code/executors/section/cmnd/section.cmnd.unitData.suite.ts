import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  LINKS: {},
  UNITDATA: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - UnitData",
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
          context: defaultCmndInitContext,
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof UNITDATA",
                  res: "undefined",
                  desc: "we aren't referencing UNITDATA so we don't localize it"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            UNITDATA: "bogusUnitData",
            step: {
              ...defaultCmndEndContext.step,
              UNITDATA: "oldUnitData"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.UNITDATA",
                  res: "oldUnitData",
                  desc: "command doesnt reference UNITDATA so we pass old along"
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
              UNITDATA: { existing: "unitData" }
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "UNITDATA",
                  res: { existing: "unitData" },
                  desc: "we're referencing UNITDATA so we import it"
                },
                {
                  sample: "UNITDATA === references.step.UNITDATA",
                  res: false,
                  desc: "we're gonna mutate it so we make a copy"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            UNITDATA: "localUnitData"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.UNITDATA",
                  res: "localUnitData",
                  desc:
                    "we have local UNITDATA reference, so just pass that along"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
