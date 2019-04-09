import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Battle - Variables",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "battle",
      contexts: [
        {
          context: {},
          envelope: "let game = { action: { start1: a => a } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.BATTLEVARS",
                  res: undefined,
                  desc: "game isn't using battlevars so we don't seed id"
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
          commands: {
            gnurp: {
              applyEffect: { setbattlevar: ["somevar", 666] }
            }
          }
        }
      },
      player: 1,
      action: "battle",
      contexts: [
        {
          context: {},
          envelope: "let game = { action: { start1: a => a } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.BATTLEVARS",
                  res: {},
                  desc: "game uses battlevars so we seed it to empty obj"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
