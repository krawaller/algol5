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
            LINKS: { actions: { othercmnd: "foo" } }
          },
          tests: [
            {
              expr: { links: [{ ifplayer: [1, "mycmnd"] }] },
              asserts: [
                {
                  sample: "LINKS.actions",
                  res: { mycmnd: "mycmnd1", othercmnd: "foo" },
                  desc: "link is performed if if is truthy"
                }
              ]
            },
            {
              expr: { links: [{ ifplayer: [2, "mycmnd"] }] },
              asserts: [
                {
                  sample: "LINKS.actions",
                  res: { othercmnd: "foo" },
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
