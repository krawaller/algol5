import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndEndContext = {
  LINKS: {},
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - End - Mixed",
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
            LINKS: "localLinks",
            step: {
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
                },
                {
                  sample: "returnVal.LINKS",
                  res: "localLinks",
                  desc: "we always mutate LINKS, so always pass it along"
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
              link: { if: [{ same: [["turn"], 666] }, "endturn"] }
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
            TURN: "localTurnVar"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: "localTurnVar",
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
