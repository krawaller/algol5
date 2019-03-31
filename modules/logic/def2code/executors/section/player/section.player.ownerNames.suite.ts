import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Player - OwnerNames",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "player",
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "player",
              naked: true,
              asserts: [
                {
                  sample: "ownerNames",
                  res: ["neutral", "my", "opp"],
                  desc: "owner prefixes set up for plr1"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: emptyFullDef,
      player: 2,
      action: "player",
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "player",
              naked: true,
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
