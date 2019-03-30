import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - End",
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
          context: {
            step: {
              path: ["before"]
            },
            LINKS: "localLinks",
            newMarkPos: "c3"
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.path",
                  res: ["before", "c3"],
                  desc: "we added the new mark position to path"
                },
                {
                  sample: "returnVal.name",
                  res: "somemark",
                  desc: "the mark name is used as step name"
                },
                {
                  sample: "returnVal.LINKS",
                  res: "localLinks",
                  desc: "always mutate links so pass them on here"
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
            neatmark: {
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
      action: "neatmark",
      contexts: [
        {
          context: {
            step: {
              stepId: "foo",
              path: []
            },
            MARKS: {},
            newMarkPos: "b2",
            ARTIFACTS: { updated: "artifacts" },
            LINKS: "newLinks"
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: { updated: "artifacts" },
                  desc: "we save the new artifacts"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
