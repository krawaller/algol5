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
  step: { path: [] },
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Start Or End definitions",
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
                  sample: "typeof UNITLAYERS",
                  res: "undefined",
                  desc:
                    "We didn't defined UNITLAYERS since we don't use it locally"
                },
                {
                  sample: "typeof TURN",
                  res: "undefined",
                  desc: "We didn't defined TURN since we don't use it locally"
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
              UNITLAYERS: "oldUnitLayers",
              TURN: "oldTurn"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "oldUnitLayers",
                  desc: "not using locally so pass it on at end"
                },
                {
                  sample: "returnVal.TURN",
                  res: "oldTurn",
                  desc: "not using locally so pass it on at end"
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
              runGenerator: {
                if: [
                  {
                    morethan: [
                      { read: ["units", "somemark", "gnurp"] },
                      ["turn"]
                    ]
                  },
                  "simplereach"
                ]
              }
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
            ...defaultMarkInitContext,
            step: {
              ...defaultMarkInitContext.step,
              UNITLAYERS: "oldUnitLayers",
              TURN: "oldTurnCount"
            }
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "UNITLAYERS",
                  res: "oldUnitLayers"
                },
                {
                  sample: "TURN",
                  res: "oldTurnCount"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
