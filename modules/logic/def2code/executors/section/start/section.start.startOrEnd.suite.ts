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
  title: "Section - Start - Start or end stuff",
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
                },
                {
                  sample: "typeof MARKS",
                  res: "undefined",
                  desc: "no local reference to MARKS so we defer to startEnd"
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
              TURN: 7,
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
                },
                {
                  sample: "returnVal.TURN",
                  res: 8,
                  desc: "no local TURN use so bump it here"
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
              if: [
                {
                  and: [{ anyat: ["units", "mymark"] }, { same: [1, ["turn"]] }]
                },
                "endturn"
              ]
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
              MARKS: "bogusMarks",
              TURN: 7
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "TURN",
                  res: 8,
                  desc: "Local turn use so bump it here"
                },
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
            MARKS: "localMarks",
            TURN: "localTurnNumber"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: "localTurnNumber",
                  desc: "used locally so inited by startInit, pass it on"
                },
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
