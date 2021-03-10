import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Artifacts - Neighbours - Count",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        boards: {
          basic: {
            ...emptyFullDef.boards.basic,
            height: 3,
            width: 3,
          },
        },
        generators: {
          countHurps: {
            type: "neighbour",
            dirs: "rose",
            start: "mymark",
            count: "hurp",
            draw: {
              start: {
                tolayer: "flarps",
                include: { seenHurps: ["totalcount"] },
              },
            },
          },
        },
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            MARKS: { mymark: "a1", myothermark: "b1" },
            TERRAIN: { hurp: { a2: {}, b2: {} } },
            ARTIFACTS: { flarps: {}, blarps: {} },
          },
          tests: [
            {
              expr: { generators: ["countHurps"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a1: { seenHurps: 2 } },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
