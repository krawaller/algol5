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
      action: "somemark",
      contexts: [
        {
          context: {
            newStepId: "foo",
            UNITDATA: { unit1: {} },
            LINKS: {}
          },
          tests: [
            {
              expr: {
                multi: [
                  { effects: [{ killid: "unit1" }] },
                  { links: ["endturn"] }
                ]
              },
              asserts: [
                {
                  sample: "LINKS",
                  res: { endturn: "start2" }
                },
                {
                  sample: "UNITDATA.unit1",
                  res: undefined
                }
              ]
            },
            {
              expr: { if: [["false"], { effects: [{ killid: "unit1" }] }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: truthy
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
