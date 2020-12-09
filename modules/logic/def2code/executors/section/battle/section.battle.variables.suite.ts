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
      ruleset: "coolrulez",
      action: "battle",
      contexts: [
        {
          context: {
            setup: {},
          },
          envelope: "let game = { action: { startTurn_coolrulez_1: a => a } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.BATTLEVARS",
                  res: undefined,
                  desc: "game isn't using battlevars so we don't seed id",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            gnurp: {
              applyEffect: { setbattlevar: ["somevar", 666] },
            },
          },
        },
      },
      player: 1,
      action: "battle",
      ruleset: "meeprulez",
      contexts: [
        {
          context: {
            setup: {},
          },
          envelope: "let game = { action: { startTurn_meeprulez_1: a => a } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.BATTLEVARS",
                  res: {},
                  desc: "game uses battlevars so we seed it to empty obj",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          battleVars: {
            foo: 7,
            bar: 3,
          },
        },
      },
      player: 1,
      action: "battle",
      ruleset: "meeprulez",
      contexts: [
        {
          context: {
            setup: {},
          },
          envelope: "let game = { action: { startTurn_meeprulez_1: a => a } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.BATTLEVARS",
                  res: { foo: 7, bar: 3 },
                  desc: "game has preseeded battlevars which we initiate",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
