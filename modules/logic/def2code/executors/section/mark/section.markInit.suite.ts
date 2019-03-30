import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkInitContext = {
  newMarkPos: "",
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Init",
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
            step: {},
            newMarkPos: "b2"
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "LINKS",
                  res: {
                    commands: {},
                    marks: {}
                  },
                  desc: "we always reset links for the new step"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
