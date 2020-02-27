import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Artifacts - Filter",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 3,
          width: 3,
          terrain: {
            rocks: [],
          },
        },
        generators: {
          noConditionFilter: {
            type: "filter",
            layer: "rocks",
            tolayer: "flarps",
          },
          singlePosCondition: {
            type: "filter",
            layer: "rocks",
            tolayer: "flarps",
            condition: {
              same: [{ read: ["rocks", ["target"], "cool"] }, "yes"],
            },
          },
          matchCondition: {
            type: "filter",
            layer: "rocks",
            tolayer: "flarps",
            matching: {
              cool: { is: "yes" },
            },
          },
        },
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            MARKS: { mymark: "a1" },
            TERRAIN1: {
              rocks: {
                a1: { cool: "yes" },
                b2: {},
              },
            },
            ARTIFACTS: { flarps: {} },
          },
          tests: [
            {
              expr: { generators: ["noConditionFilter"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a1: { cool: "yes" }, b2: {} },
                },
              ],
            },
            {
              expr: { generators: ["singlePosCondition"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a1: { cool: "yes" } },
                },
              ],
            },
            {
              expr: { generators: ["matchCondition"] },
              asserts: [
                {
                  sample: "ARTIFACTS.flarps",
                  res: { a1: { cool: "yes" } },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
