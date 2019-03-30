import { executeSection } from "..";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartEndContext = {
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - End",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "start",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
              TURN: 7
            },
            ARTIFACTS: "localArtifacts",
            UNITDATA: "localUnitData",
            LINKS: "localLinks"
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "localArtifacts"
                },
                {
                  sample: "returnVal.UNITDATA",
                  res: "localUnitData"
                },
                {
                  sample: "returnVal.MARKS",
                  res: {},
                  desc:
                    "we didnt reference MARKS locally so have to initiate the empty obj here"
                },
                {
                  sample: "returnVal.LINKS",
                  res: "localLinks"
                },
                {
                  sample: "returnVal.name",
                  res: "start"
                },
                {
                  sample: "returnVal.path",
                  res: []
                },
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: falsy
                },
                {
                  sample: "returnVal.TURN",
                  res: 8
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
            mymark: { from: "units" }
          },
          startTurn: {
            link: {
              if: [
                {
                  and: [{ anyat: ["units", "mymark"] }, { same: [1, ["turn"]] }]
                },
                "endturn"
              ]
            }
          },
          commands: {
            somecmnd: {
              applyEffect: { spawnat: ["somemark", "gnurps"] }
            }
          }
        }
      },
      action: "start",
      player: 2,
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            ARTIFACTS: "localArtifacts",
            UNITDATA: "localUnitData",
            MARKS: "localMarks",
            LINKS: "localLinks",
            TURN: "localTurnNumber",
            step: {
              ...defaultStartEndContext.step,
              NEXTSPAWNID: "oldNextSpawnId"
            }
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: "localTurnNumber"
                },
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: "oldNextSpawnId"
                },
                {
                  sample: "returnVal.MARKS",
                  res: "localMarks",
                  desc:
                    "since we referenced MARKS locally they're already initialized by startInit"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
