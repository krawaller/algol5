import { executeLink } from "./";
import { emptyFullDef } from "../../../../common";
import { TestSuite } from "../../../../types";

export const testSuite: TestSuite<string> = {
  title: "Link - Command",
  func: executeLink,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            mycmnd: {}
          }
        }
      },
      player: 1,
      action: "start",
      contexts: [
        {
          context: {
            turn: {
              links: { root: { b3: "somemark" } },
              other: { foo: "bar" }
            }
          },
          tests: [
            {
              expr: "mycmnd",
              sample: "turn.links.root",
              res: { mycmnd: "mycmnd1", b3: "somemark" },
              desc: "we can link to a cmnd from start"
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
            mycmnd: {}
          }
        }
      },
      player: 2,
      action: "someaction",
      contexts: [
        {
          context: {
            turn: {
              links: { foo: { b3: "somemark" } },
              other: { foo: "bar" }
            },
            newStepId: "foo"
          },
          tests: [
            {
              expr: "mycmnd",
              sample: "turn.links.foo",
              res: { mycmnd: "mycmnd2", b3: "somemark" },
              desc: "we can link to a cmnd from non-start"
            }
          ]
        }
      ]
    }
  ]
};
