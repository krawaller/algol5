import { executeOrder } from "..";
import { emptyFullDef, truthy } from "../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Section - Orders",
  func: executeOrder,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      ruleset: "flurprulez",
      action: "somemark",
      contexts: [
        {
          context: {
            newStepId: "foo",
            UNITDATA: { unit1: {} },
            LINKS: {},
            ARTIFACTS: {
              gnurps: { a1: {} },
              flurps: { b2: {} },
            },
          },
          tests: [
            {
              expr: { purge: ["gnurps"] },
              asserts: [
                { sample: "ARTIFACTS.gnurps", res: {} },
                { sample: "ARTIFACTS.flurps", res: { b2: {} } },
              ],
            },
            {
              expr: { purge: ["gnurps", { if: [["true"], "flurps"] }] },
              asserts: [
                { sample: "ARTIFACTS.gnurps", res: {} },
                { sample: "ARTIFACTS.flurps", res: {} },
              ],
            },
            {
              expr: {
                multi: [
                  { effects: [{ killid: "unit1" }] },
                  { links: ["endTurn"] },
                ],
              },
              asserts: [
                {
                  sample: "LINKS",
                  res: { endTurn: "startTurn_flurprulez_2" },
                },
                {
                  sample: "UNITDATA.unit1",
                  res: undefined,
                },
              ],
            },
            {
              expr: { if: [["false"], { effects: [{ killid: "unit1" }] }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: truthy,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
