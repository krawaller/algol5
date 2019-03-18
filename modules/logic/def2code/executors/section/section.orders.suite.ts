import { executeSection } from "../../executors";
import { emptyFullDef } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Orders",
  func: executeSection,
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
            turn: { links: { foo: {} } }
          },
          tests: [
            {
              expr: { orders: [ { effects: [{ killid: 'unit1' }] }, { links: ["endturn"] } ] },
              asserts: [
                {
                  sample: "turn.links.foo",
                  res: { endturn: "start2" }
                },
                {
                  sample: "UNITDATA.unit1",
                  res: undefined
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
