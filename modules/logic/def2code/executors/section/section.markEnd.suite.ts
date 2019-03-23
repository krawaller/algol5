import { executeSection } from "..";
import { emptyFullDef } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

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
              path: ["before"],
              flurp: "gnurp"
            },
            MARKS: { updated: "marks" },
            LINKS: "newLinks",
            newMarkPos: "c3"
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal",
                  res: {
                    flurp: "gnurp",
                    path: ["before", "c3"],
                    name: "somemark",
                    MARKS: {
                      updated: "marks"
                    },
                    LINKS: "newLinks"
                  }
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
                condition: { same: [{ turnvar: "poo" }, { battlevar: "moo" }] },
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
