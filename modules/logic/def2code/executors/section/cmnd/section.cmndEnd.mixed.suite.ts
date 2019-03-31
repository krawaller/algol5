import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndEndContext = {
  LINKS: {},
  UNITDATA: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - End - Mixed",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndEndContext,
            LINKS: "localLinks",
            step: {
              path: ["prevStep"]
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.LINKS",
                  res: "localLinks",
                  desc: "we always mutate LINKS, so always pass it along"
                },
                {
                  sample: "returnVal.path",
                  res: ["prevStep", "somecmnd"],
                  desc: "it adds command name to path"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
