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
              from: "units",
            },
          },
        },
      },
      player: 1,
      ruleset: "1337rulez",
      action: "startTurn",
      contexts: [
        {
          context: {
            UNITLAYERS: { units: { a1: {}, b2: {} } },
            LINKS: { marks: { gnork: "bork" } },
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              asserts: [
                {
                  sample: "LINKS.marks",
                  res: {
                    gnork: "bork",
                    a1: "somemark_1337rulez_1",
                    b2: "somemark_1337rulez_1",
                  },
                  desc: "we can link to a mark from start",
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
          marks: {
            somemark: {
              from: "units",
            },
          },
        },
      },
      player: 2,
      action: "someaction",
      ruleset: "superrulez",
      contexts: [
        {
          context: {
            UNITLAYERS: { units: { a1: {}, b2: {} } },
            LINKS: { marks: {} },
            newStepId: "foo",
          },
          tests: [
            {
              expr: { links: ["somemark"] },
              asserts: [
                {
                  sample: "LINKS.marks",
                  res: {
                    a1: "somemark_superrulez_2",
                    b2: "somemark_superrulez_2",
                  },
                  desc: "we can link to a mark from non-start",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
