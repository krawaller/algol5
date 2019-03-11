import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Link - Logical",
  func: executeOrder,
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
              expr: { links: [{ ifplayer: [1, "mycmnd"] }] },
              asserts: [
                {
                  sample: "turn.links.root",
                  res: { mycmnd: "mycmnd1", b3: "somemark" },
                  desc: "link is performed if if is truthy"
                }
              ]
            },
            {
              expr: { links: [{ ifplayer: [2, "mycmnd"] }] },
              asserts: [
                {
                  sample: "turn.links.root",
                  res: { b3: "somemark" },
                  desc: "link is not performed if if is falsy"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
