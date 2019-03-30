import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  step: {
    UNITLAYERS: {}
  }
};

const defaultStartEndContext = {
  emptyArtifactLayers: {},
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Artifacts",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "start",
      contexts: [
        {
          context: defaultStartInitContext,
          tests: [
            {
              expr: "startInit",
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
            ...defaultStartEndContext,
            emptyArtifactLayers: "emptyArtifactLayers"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "emptyArtifactLayers",
                  desc: "we pass on empty artifact layer"
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
          startTurn: {
            runGenerator: "simplereach"
          }
        },
        generators: {
          simplereach: {
            type: "neighbour",
            dir: 1,
            starts: "units",
            draw: {
              neighbours: {
                tolayer: "flurps",
                include: {
                  owner: ["player"]
                }
              }
            }
          },
          anothergen: {
            type: "filter",
            layer: "flurps",
            tolayer: "gnurps"
          }
        }
      },
      player: 2,
      action: "start",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            step: {
              ...defaultStartInitContext.step,
              ARTIFACTS: {
                flurps: { existing: "flurp" },
                myflurps: { existing: "myflurp" },
                oppflurps: { existing: "oppflurp" },
                neutralflurps: { existing: "neutralflurp" },
                gnurps: { existing: "gnurp" }
              }
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "ARTIFACTS.flurps",
                  res: { existing: "flurp" },
                  desc: "we have old flurps"
                },
                {
                  sample:
                    "ARTIFACTS.flurps === references.step.ARTIFACTS.flurps",
                  res: false,
                  desc: "we have new reference to allow mutation"
                },
                {
                  sample: "ARTIFACTS.myflurps",
                  res: { existing: "myflurp" },
                  desc: "we have old myflurps"
                },
                {
                  sample:
                    "ARTIFACTS.myflurps === references.step.ARTIFACTS.myflurps",
                  res: false,
                  desc: "we have new reference to allow mutation"
                },
                {
                  sample: "ARTIFACTS.gnurps",
                  res: { existing: "gnurp" },
                  desc: "we have old gnurps"
                },
                {
                  sample:
                    "ARTIFACTS.gnurps === references.step.ARTIFACTS.gnurps",
                  res: true,
                  desc: "we keep old reference since we won't mutate"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultStartEndContext,
            ARTIFACTS: "localArtifacts"
          },
          tests: [
            {
              expr: "startEnd",
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
