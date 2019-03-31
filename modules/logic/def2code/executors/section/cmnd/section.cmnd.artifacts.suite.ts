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
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {
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
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
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
              expr: "cmndInit",
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
            ...defaultCmndEndContext,
            ARTIFACTS: "localArtifacts"
          },
          tests: [
            {
              expr: "cmndEnd",
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
