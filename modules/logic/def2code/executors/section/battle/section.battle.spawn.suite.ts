import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Battle - Spawn",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "battle",
      contexts: [
        {
          context: {},
          envelope: "let game = { action: { startTurn1: a => a } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: undefined,
                  desc: "game isn't using spawn so we don't seed id"
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
              applyEffect: { spawnat: ["somemark", "someunit"] }
            }
          }
        }
      },
      player: 1,
      action: "battle",
      contexts: [
        {
          context: {},
          envelope: "let game = { action: { startTurn1: a => a } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: 1,
                  desc: "game uses spawning so we seed id"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
