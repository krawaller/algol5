import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  emptyArtifactLayers: {},
  step: {
    UNITLAYERS: {}
  }
};

const defaultStartEndContext = {
  emptyArtifactLayers: {},
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Turn",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "start",
      contexts: [
        {
          context: defaultStartInitContext,
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "typeof TURN",
                  res: "undefined",
                  desc:
                    "we didn't define turn since we didn't need them locally"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
              MARKS: "bogusMarks"
            }
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.MARKS",
                  res: {},
                  desc:
                    "we didnt reference MARKS locally so have to initiate the empty obj here"
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
            mymark: { from: "units" }
          },
          startTurn: {
            link: {
              if: [{ anyat: ["units", "mymark"] }, "endturn"]
            }
          }
        }
      },
      player: 1,
      action: "start",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            step: {
              ...defaultStartInitContext.step,
              MARKS: "bogusMarks"
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "MARKS",
                  res: {},
                  desc: "Local use so initiate empty MARKS here"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultStartEndContext,
            MARKS: "localMarks"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.MARKS",
                  res: "localMarks",
                  desc:
                    "since we referenced MARKS locally they're already initialized by startInit"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
