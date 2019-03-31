import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Init - Mixed",
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
        }
      ]
    }
  ]
};
