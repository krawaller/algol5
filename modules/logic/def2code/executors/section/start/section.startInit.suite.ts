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
      action: "start",
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
                  sample: "UNITDATA",
                  res: "oldUnitData",
                  desc: "old data was saved into local var"
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
    }
  ]
};
