import { executeLink } from "./";
import { emptyFullDef } from "../../../../common";
import { TestSuite } from "../../../../types";

export const testSuite: TestSuite<string> = {
  title: "Link - Mark",
  func: executeLink,
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
              expr: "somemark",
              sample: "turn.links.root",
              res: { a1: "somemark1", b2: "somemark1", c3: "othermark1" },
              desc: "we can link to a mark from start"
            }
          ]
        }
      ]
    }
  ]
};
