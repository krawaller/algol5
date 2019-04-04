import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Head - Always",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        generators: {
          foo: {
            type: "neighbour",
            draw: {
              start: {
                tolayer: "gnurps"
              },
              neighbours: {
                tolayer: "flurps",
                include: {
                  owner: 1
                }
              }
            }
          }
        }
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "head",
              naked: true,
              asserts: [
                {
                  sample: "emptyArtifactLayers",
                  res: {
                    gnurps: {},
                    flurps: {},
                    myflurps: {},
                    oppflurps: {},
                    neutralflurps: {}
                  },
                  desc:
                    "we're not using generators in start turn, so define empty layers here"
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
            runGenerator: "foo"
          }
        },
        generators: {
          foo: {
            type: "neighbour",
            draw: {
              start: {
                tolayer: "gnurps"
              },
              neighbours: {
                tolayer: "flurps",
                include: {
                  owner: 1
                }
              }
            }
          }
        }
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "head",
              naked: true,
              asserts: [
                {
                  sample: "typeof emptyArtifactLayers",
                  res: "undefined",
                  desc: "have to define inside startInit, so dont do it here"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
