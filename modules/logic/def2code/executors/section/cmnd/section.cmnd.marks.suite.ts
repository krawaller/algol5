import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  MARKS: {},
  LINKS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Marks",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              MARKS: "bogusMarks"
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof MARKS",
                  res: "undefined",
                  desc:
                    "we didn't import marks since we didn't need them locally"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            MARKS: "bogusMarks",
            step: {
              ...defaultCmndEndContext.step,
              MARKS: "bogusMarks"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.MARKS",
                  res: {},
                  desc:
                    "we didnt reference MARKS locally so reset to empty obj here"
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
              link: { if: [{ anyat: ["units", "somemark"] }, "endTurn"] }
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
              MARKS: "oldMarks"
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "MARKS",
                  res: "oldMarks",
                  desc: "Local use so import old MARKS here"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            MARKS: "bogusLocalMarks"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.MARKS",
                  res: {},
                  desc:
                    "ignore marks imported by cmndInit, we always pass on empty obj"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
