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
                  sample: "typeof ARTIFACTS",
                  res: "undefined",
                  desc:
                    "We didn't defined ARTIFACTS since we don't use it locally"
                },
                {
                  sample: "typeof UNITLAYERS",
                  res: "undefined",
                  desc:
                    "We didn't defined UNITLAYERS since we don't use it locally"
                },
                {
                  sample: "typeof UNITDATA",
                  res: "undefined",
                  desc:
                    "We didn't defined UNITDATA since we don't use it locally"
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
              ARTIFACTS: "oldArtifacts",
              UNITLAYERS: "oldUnitLayers",
              UNITDATA: "oldUnitData",
              TURN: "oldTurn"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "oldArtifacts",
                  desc: "not using locally so pass it on at end"
                },
                {
                  sample: "returnVal.UNITLAYERS",
                  res: "oldUnitLayers",
                  desc: "not using locally so pass it on at end"
                },
                {
                  sample: "returnVal.UNITDATA",
                  res: "oldUnitData",
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
    }
    // {
    //   def: {
    //     ...emptyFullDef,
    //     flow: {
    //       ...emptyFullDef.flow,
    //       marks: {
    //         neatmark: {
    //           from: "units",
    //           runGenerator: { if: [{ morethan: [3, ["turn"]] }, "simplereach"] }
    //         }
    //       }
    //     },
    //     generators: {
    //       simplereach: {
    //         type: "neighbour",
    //         dir: 1,
    //         starts: "units",
    //         draw: {
    //           neighbours: {
    //             tolayer: "flurps"
    //           }
    //         }
    //       }
    //     }
    //   },
    //   player: 2,
    //   action: "neatmark",
    //   contexts: [
    //     {
    //       context: {
    //         step: {
    //           MARKS: {},
    //           ARTIFACTS: "oldArtifacts",
    //           UNITLAYERS: "oldUnitLayers",
    //           TURN: "oldTurnCount"
    //         },
    //         newMarkPos: "b2"
    //       },
    //       tests: [
    //         {
    //           expr: "markInit",
    //           asserts: [
    //             {
    //               sample: "ARTIFACTS",
    //               res: "oldArtifacts"
    //             },
    //             {
    //               sample: "UNITLAYERS",
    //               res: "oldUnitLayers"
    //             },
    //             {
    //               sample: "TURN",
    //               res: "oldTurnCount"
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
};
