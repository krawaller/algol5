import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkEndContext = {
  MARKS: {},
  LINKS: {},
  UNITLAYERS: {},
  step: { path: [] },
  newMarkPos: "a1"
};

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
            ...defaultMarkEndContext,
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
                  desc: "we always mutate links so pass them on here"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
