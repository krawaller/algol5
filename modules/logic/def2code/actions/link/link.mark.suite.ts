import { executeOrder } from "../../executors";
import { emptyFullDef } from "../../../../common";
import { AlgolWriterSuite, AlgolOrderAnon } from "../../../../types";

export const testSuite: AlgolWriterSuite<AlgolOrderAnon> = {
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
            turn: {
              links: { root: { c3: "othermark1" } },
              other: { foo: "bar" }
            }
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              sample: "turn.links.root",
              res: { a1: "somemark1", b2: "somemark1", c3: "othermark1" },
              desc: "we can link to a mark from start"
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
            turn: {
              links: { foo: { c3: "othermark2" } }
            },
            newStepId: "foo"
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              sample: "turn.links.foo",
              res: { a1: "somemark2", b2: "somemark2", c3: "othermark2" },
              desc: "we can link to a mark from non-start"
            }
          ]
        }
      ]
    }
  ]
};
