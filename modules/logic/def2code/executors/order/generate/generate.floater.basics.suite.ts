import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Artifacts - Floater",
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
          floatStepsAndBlocks: {
            type: "floater",
            dirs: "rose",
            start: "mymark",
            steps: "units",
            blocks: "oppunits",
            draw: {
              steps: { tolayer: "floats" },
              blocks: { tolayer: "gnarps" },
            },
          },
        },
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            UNITLAYERS: {
              units: { a1: {}, b1: {}, a2: {}, a3: {}, c1: {} },
              oppunits: { a2: {}, c3: {} },
            },
            ARTIFACTS: {
              floats: {},
              gnarps: {},
            },
            MARKS: {
              mymark: "a1",
            },
          },
          tests: [
            {
              expr: { generators: ["floatStepsAndBlocks"] },
              asserts: [
                {
                  sample: "ARTIFACTS.floats",
                  res: { b1: {}, c1: {} },
                },
                {
                  sample: "ARTIFACTS.gnarps",
                  res: { a2: {} },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
