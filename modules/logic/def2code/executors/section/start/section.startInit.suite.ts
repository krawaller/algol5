import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  emptyArtifactLayers: {},
  step: {
    UNITLAYERS: {}
  }
};

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
          context: defaultStartInitContext,
          tests: [
            {
              expr: "startInit",
              asserts: [
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
