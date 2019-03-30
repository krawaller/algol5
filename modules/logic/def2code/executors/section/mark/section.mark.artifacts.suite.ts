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
  step: { path: [] },
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
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: {
              from: "units",
              runGenerator: "simplereach"
            }
          }
        },
        generators: {
          simplereach: {
            type: "neighbour",
            dir: 1,
            starts: "units",
            draw: {
              neighbours: {
                tolayer: "flurps"
              }
            }
          }
        }
      },
      player: 2,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultMarkEndContext,
            ARTIFACTS: "localArtifacts"
          },
          tests: [
            // TODO - markInit artifact handling!
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "localArtifacts",
                  desc: "we pass on the updated artifacts"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
