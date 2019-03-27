import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Init",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            emptyArtifactLayers: { empty: "layers" },
            step: {
              UNITDATA: "oldUnitData",
              UNITLAYERS: {}
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "ARTIFACTS",
                  res: { empty: "layers" }
                },
                {
                  sample: "typeof TURN",
                  res: "undefined",
                  desc: "we didn't define turn since we didn't need them"
                },
                {
                  sample: "typeof NEXTSPAWNID",
                  res: "undefined"
                },
                {
                  sample: "UNITDATA",
                  res: "oldUnitData",
                  desc: "old data was saved into local var"
                },
                {
                  sample: "MARKS",
                  res: {},
                  desc: "initialise marks to empty object"
                },
                {
                  sample: "LINKS",
                  res: {
                    commands: {},
                    marks: {}
                  },
                  desc: "initialise LINKS to correct empty object"
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
          endGame: {
            fnurp: {
              condition: { same: [5, ["turn"]] }
            }
          },
          commands: {
            somecmnd: {
              applyEffect: { spawnat: ["somemark", "gnurps"] }
            }
          }
        },
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            flurps: "bishop",
            gnurps: "king"
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            emptyArtifactLayers: {},
            step: {
              UNITLAYERS: {},
              NEXTSPAWNID: "oldNextSpawnId",
              TURN: 7
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "NEXTSPAWNID",
                  res: "oldNextSpawnId"
                },
                {
                  sample: "TURN",
                  res: 8,
                  desc: "turn from last step was bumped once"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
