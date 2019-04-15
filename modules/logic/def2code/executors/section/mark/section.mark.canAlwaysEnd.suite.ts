import { executeSection } from "..";
import { emptyFullDef, falsy } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkEndContext = {
  MARKS: {},
  LINKS: {},
  UNITLAYERS: {},
  step: {},
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - canAlwaysEnd",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: { link: "somemark" },
          marks: {
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: defaultMarkEndContext,
          tests: [
            {
              expr: "markEnd",
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
        meta: {
          ...emptyFullDef.meta,
          performance: {
            canAlwaysEnd: {
              somemark: true
            }
          }
        },
        flow: {
          ...emptyFullDef.flow,
          startTurn: { link: "somemark" },
          marks: {
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: defaultMarkEndContext,
          tests: [
            {
              expr: "markEnd",
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
