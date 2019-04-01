import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Player - OwnerNames",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "player",
              player: 1,
              asserts: [
                {
                  sample: "ownerNames",
                  res: ["neutral", "my", "opp"],
                  desc: "owner prefixes are set up for plr1"
                }
              ]
            },
            {
              expr: "player",
              player: 2,
              asserts: [
                {
                  sample: "ownerNames",
                  res: ["neutral", "opp", "my"],
                  desc: "owner prefixes set up for plr2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
