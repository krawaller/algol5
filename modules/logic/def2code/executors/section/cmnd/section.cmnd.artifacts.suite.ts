import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  MARKS: {},
  LINKS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Artifacts",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: { link: "somecmnd" },
          commands: {
            somecmnd: {}
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: defaultCmndInitContext,
          tests: [
            {
              expr: "cmndInit",
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
            ...defaultCmndEndContext,
            step: {
              ...defaultCmndEndContext.step,
              ARTIFACTS: "oldArtifacts"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
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
