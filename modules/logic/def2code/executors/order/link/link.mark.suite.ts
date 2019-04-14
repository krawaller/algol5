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
      action: "startTurn",
      contexts: [
        {
          context: {
            UNITLAYERS: { units: { a1: {}, b2: {} } },
            LINKS: { actions: { gnork: "bork" } }
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              asserts: [
                {
                  sample: "LINKS.actions",
                  res: {
                    gnork: "bork",
                    a1: "somemark1",
                    b2: "somemark1"
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
            LINKS: { actions: {} },
            newStepId: "foo"
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              asserts: [
                {
                  sample: "LINKS.actions",
                  res: {
                    a1: "somemark2",
                    b2: "somemark2"
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
