import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndEndContext = {
  LINKS: {},
  MARKS: {},
  step: { path: [] }
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
            MARKS: "localMarks",
            step: {
              TURN: "oldTurn",
              path: ["prevStep"]
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
                },
                {
                  sample: "returnVal.MARKS",
                  res: "localMarks",
                  desc: "we always reset MARKS so pass that along"
                },
                {
                  sample: "returnVal.path",
                  res: ["prevStep", "somecmnd"],
                  desc: "it adds command name to path"
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
