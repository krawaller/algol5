import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkInitContext = {
  newMarkPos: "",
  step: { ARTIFACTS: {} }
};

const defaultMarkEndContext = {
  MARKS: {},
  LINKS: {},
  step: {},
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - UnitLayers",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: { link: "somemark" },
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
                  sample: "typeof UNITLAYERS",
                  res: "undefined",
                  desc:
                    "We didn't defined UNITLAYERS since we don't use it locally"
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
              UNITLAYERS: "oldUnitLayers"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "oldUnitLayers",
                  desc: "not using locally so pass old on at end"
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
          startTurn: { link: "somemark" },
          marks: {
            somemark: {
              from: "units",
              link: { if: [{ anyat: ["units", "somemark"] }, "endTurn"] }
            }
          }
        }
      },
      player: 2,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultMarkInitContext,
            step: {
              ...defaultMarkInitContext.step,
              UNITLAYERS: "oldUnitLayers"
            }
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "UNITLAYERS",
                  res: "oldUnitLayers",
                  desc: "referencing locally so init here"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            UNITLAYERS: "localUnitLayers"
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "localUnitLayers",
                  desc: "using locally so already imported, pass that on"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
