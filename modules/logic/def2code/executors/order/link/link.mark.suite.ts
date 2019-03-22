import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Link - Mark",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 1,
      action: "start",
      contexts: [
        {
          context: {
            UNITLAYERS: { units: { a1: {}, b2: {} } },
            LINKS: { marks: { othermark: "foo" } }
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              asserts: [
                {
                  sample: "LINKS.marks",
                  res: {
                    othermark: "foo",
                    somemark: {
                      func: "somemark1",
                      pos: ["a1", "b2"]
                    }
                  },
                  desc: "we can link to a mark from start"
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
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 2,
      action: "someaction",
      contexts: [
        {
          context: {
            UNITLAYERS: { units: { a1: {}, b2: {} } },
            LINKS: { marks: {} },
            newStepId: "foo"
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              asserts: [
                {
                  sample: "LINKS.marks.somemark",
                  res: {
                    func: "somemark2",
                    pos: ["a1", "b2"]
                  },
                  desc: "we can link to a mark from non-start"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
