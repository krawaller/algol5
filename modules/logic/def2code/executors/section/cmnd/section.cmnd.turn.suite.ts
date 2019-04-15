import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  LINKS: {},
  UNITDATA: {},
  UNITLAYERS: {},
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Turn",
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
                  sample: "typeof TURN",
                  res: "undefined",
                  desc: "we aren't referencing TURN so we don't localize it"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            TURN: "bogusTurn",
            step: {
              ...defaultCmndEndContext.step,
              TURN: "oldTurn"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: "oldTurn",
                  desc: "command doesnt reference TURN so we pass old along"
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
                if: [{ same: [["turn"], 777] }, { killat: "somemark" }]
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
              TURN: "oldTurn"
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "TURN",
                  res: "oldTurn",
                  desc: "we're referencing TURN so we import it"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            TURN: "localTurn"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: "localTurn",
                  desc: "we have local TURN reference, so just pass that along"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
