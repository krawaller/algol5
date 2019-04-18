import { executeSection } from "..";
import { emptyFullDef, falsy } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndEndContext = {
  LINKS: {},
  UNITDATA: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - canAlwaysEnd",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: defaultCmndEndContext,
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.canAlwaysEnd",
                  res: falsy,
                  desc: "by default we don't mark steps as canAlwaysEnd"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        performance: {
          canAlwaysEnd: {
            somecmnd: true
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: defaultCmndEndContext,
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.canAlwaysEnd",
                  res: true,
                  desc:
                    "new step is marked as canAlwaysEnd since action is marked as such in performance"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
