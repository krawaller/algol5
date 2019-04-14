import { executeOrder } from "../../../executors";
import { emptyFullDef, falsy } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Link - EndTurn",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          endGame: {
            conquer: {
              condition: { truthy: { turnvar: "won" } },
              show: { singles: ["marka1", "marka2"] }
            },
            surrender: {
              condition: { truthy: { turnvar: "lost" } },
              who: ["otherplayer"]
            },
            neither: {
              condition: { truthy: { turnvar: "draw" } },
              who: 0
            }
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            TURNVARS: {},
            LINKS: {},
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: { links: ["endTurn"] },
              asserts: [
                {
                  sample: "LINKS.endTurn",
                  res: "startTurn2",
                  desc: "we can link to endTurn, passing over to next plr"
                }
              ]
            }
          ]
        },
        {
          context: {
            TURNVARS: { won: "yes" },
            LINKS: {
              endMarks: {}
            },
            newStepId: "foo",
            MARKS: { marka1: "a1", marka2: "a2" }
          },
          tests: [
            {
              expr: { links: ["endTurn"] },
              asserts: [
                {
                  sample: "LINKS.endGame",
                  res: "win",
                  desc: "we can link to winning the game"
                },
                {
                  sample: "LINKS.endedBy",
                  res: "conquer"
                },
                {
                  sample: "LINKS.endMarks",
                  res: ["a1", "a2"]
                },
                {
                  sample: "LINKS.endTurn",
                  res: falsy,
                  desc: "we don't set endTurn when game ends"
                }
              ]
            }
          ]
        },
        {
          context: {
            TURNVARS: { lost: "yes" },
            LINKS: {},
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: { links: ["endTurn"] },
              asserts: [
                {
                  sample: "LINKS.endGame",
                  res: "lose",
                  desc: "we can link to losing endTurn"
                },
                {
                  sample: "LINKS.endedBy",
                  res: "surrender"
                },
                {
                  sample: "LINKS.endTurn",
                  res: falsy
                }
              ]
            }
          ]
        },
        {
          context: {
            TURNVARS: { draw: "yes" },
            LINKS: {},
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: { links: ["endTurn"] },
              asserts: [
                {
                  sample: "LINKS.endGame",
                  res: "draw",
                  desc: "we can link to draw endTurn"
                },
                {
                  sample: "LINKS.endedBy",
                  res: "neither"
                },
                {
                  sample: "LINKS.endTurn",
                  res: falsy
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
