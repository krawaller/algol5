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
  title: "Section - Mark - Always",
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
                  sample: "LINKS",
                  res: {
                    actions: {}
                  },
                  desc: "we always reset links for the new step"
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
              UNITDATA: "oldUnitData",
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
                  sample: "returnVal.LINKS",
                  res: "localLinks",
                  desc: "we always mutate links so pass them on here"
                },
                {
                  sample: "returnVal.UNITDATA",
                  res: "oldUnitData",
                  desc:
                    "we never reference UNITDATA in marks, just pass it along"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
