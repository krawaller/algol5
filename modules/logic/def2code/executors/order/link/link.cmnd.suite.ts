import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Link - Command",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            mycmnd: {},
          },
        },
      },
      player: 1,
      ruleset: "megarulez",
      action: "startTurn",
      contexts: [
        {
          context: {
            LINKS: { commands: { foo: "bar" } },
          },
          tests: [
            {
              expr: { links: ["mycmnd"] },
              asserts: [
                {
                  sample: "LINKS.commands",
                  res: { mycmnd: "mycmnd_megarulez_1", foo: "bar" },
                  desc: "we can link to a cmnd from start",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            mycmnd: {},
          },
        },
      },
      player: 2,
      action: "someaction",
      ruleset: "superrulez",
      contexts: [
        {
          context: {
            LINKS: { commands: { foo: "bar" } },
          },
          tests: [
            {
              expr: { links: ["mycmnd"] },
              asserts: [
                {
                  sample: "LINKS.commands",
                  res: { mycmnd: "mycmnd_superrulez_2", foo: "bar" },
                  desc: "we can link to a cmnd from non-start (and as 2nd plr)",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
