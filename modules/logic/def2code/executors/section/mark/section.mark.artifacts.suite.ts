import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkInitContext = {
  newMarkPos: "",
  step: {}
};

const defaultMarkEndContext = {
  MARKS: {},
  LINKS: {},
  UNITLAYERS: {},
  step: {},
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Artifacts",
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
          context: defaultMarkInitContext,
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "typeof ARTIFACTS",
                  res: "undefined",
                  desc: "Not using locally, so don't import"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            step: {
              ...defaultMarkEndContext.step,
              ARTIFACTS: "oldArtifacts"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "oldArtifacts",
                  desc: "We didnt use it locally, so pass on old"
                },
                {
                  sample: "returnVal.ARTIFACTS === references.step.ARTIFACTS",
                  res: true,
                  desc: "Just reuse same reference since we're not mutating"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
