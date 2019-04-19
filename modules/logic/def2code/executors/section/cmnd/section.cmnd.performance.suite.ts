import { executeSection } from "..";
import { emptyFullDef, falsy } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndEndContext = {
  LINKS: {},
  UNITDATA: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Performance",
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
                },
                {
                  sample: "returnVal.massiveTree",
                  res: falsy,
                  desc: "by default we don't mark steps as massiveTree"
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
          },
          massiveTree: {
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
                },
                {
                  sample: "returnVal.massiveTree",
                  res: true,
                  desc:
                    "new step is marked as massiveTree since action is marked as such in performance"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
