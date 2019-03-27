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
                  desc:
                    "we didn't define turn since we didn't need them locally"
                },
                {
                  sample: "UNITDATA",
                  res: "oldUnitData",
                  desc: "old data was saved into local var"
                },
                {
                  sample: "typeof MARKS",
                  res: "undefined",
                  desc: "no local reference to MARKS so we defer to startEnd"
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
              TURN: 7
            }
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "TURN",
                  res: 8,
                  desc: "turn from last step was bumped once"
                },
                {
                  sample: "MARKS",
                  res: {},
                  desc: "we initiated MARK to empty obj"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
