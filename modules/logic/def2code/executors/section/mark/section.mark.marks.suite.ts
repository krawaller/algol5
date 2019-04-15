import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkInitContext = {
  newMarkPos: "",
  step: {}
};

const defaultMarkEndContext = {
  UNITLAYERS: {},
  MARKS: {},
  LINKS: {},
  step: {},
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Marks",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: { link: "somemark" },
          marks: {
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: defaultMarkInitContext,
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "typeof MARKS",
                  res: "undefined",
                  desc: "no local reference, so we defer to markEnd"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            newMarkPos: "c2",
            step: {
              ...defaultMarkEndContext.step,
              MARKS: {
                olderMark: "foo"
              }
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.MARKS",
                  res: {
                    somemark: "c2"
                  },
                  desc: "New mark was added to new step"
                },
                {
                  sample: "returnVal.MARKS === references.step.MARKS",
                  res: false,
                  desc: "We didn't mutate old marks"
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
          startTurn: { link: "somemark" },
          marks: {
            anothermark: {
              from: "units"
            },
            somemark: {
              from: "units",
              link: { if: [{ anyat: ["units", "anothermark"] }, "endTurn"] }
            }
          }
        }
      },
      player: 2,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultMarkInitContext,
            step: {
              ...defaultMarkInitContext.step,
              MARKS: { anothermark: "a1" }
            },
            newMarkPos: "d2"
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "MARKS",
                  res: {
                    somemark: "d2"
                  },
                  desc: "The new mark added to local variable"
                },
                {
                  sample: "references.step.MARKS === MARKS",
                  res: false,
                  desc: "we didn't mutate the previous MARKS object"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            MARKS: "localMarks"
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.MARKS",
                  res: "localMarks",
                  desc:
                    "We used marks locally so they were inited by markInit. Pass that on"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
