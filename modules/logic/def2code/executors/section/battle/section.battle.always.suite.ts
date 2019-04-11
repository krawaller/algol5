import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Battle - Always",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 3,
          width: 3
        },
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            flurps: "knight"
          }
        },
        setup: {
          flurps: {
            1: ["a1"],
            2: ["b2"]
          }
        },
        flow: {
          ...emptyFullDef.flow,
          endGame: {
            gnork: {
              condition: {
                isempty: {
                  union: ["myflurps"]
                }
              }
            }
          }
        }
      },
      player: 2,
      action: "battle",
      contexts: [
        {
          context: {},
          envelope:
            "let game = { action: { start1: a => ({...a, sentToStart1: true }) } };",
          tests: [
            {
              expr: "newBattle",
              asserts: [
                {
                  sample: "returnVal.sentToStart1",
                  res: true,
                  desc: "we pass result of calling game.action.start1"
                },
                {
                  sample: "returnVal.TURN",
                  res: 0,
                  desc: "seed with turn 0 since start1 will add +1"
                },
                {
                  sample: "returnVal.UNITDATA",
                  res: {
                    unit1: {
                      id: "unit1",
                      group: "flurps",
                      owner: 1,
                      pos: "a1",
                      x: 1,
                      y: 1
                    },
                    unit2: {
                      id: "unit2",
                      group: "flurps",
                      owner: 2,
                      pos: "b2",
                      x: 2,
                      y: 2
                    }
                  },
                  desc: "initial unitdata was seeded"
                },
                {
                  sample: "returnVal.UNITLAYERS",
                  res: {
                    units: {
                      a1: {
                        id: "unit1",
                        group: "flurps",
                        owner: 1,
                        pos: "a1",
                        x: 1,
                        y: 1
                      },
                      b2: {
                        id: "unit2",
                        group: "flurps",
                        owner: 2,
                        pos: "b2",
                        x: 2,
                        y: 2
                      }
                    },
                    oppflurps: {
                      a1: {
                        id: "unit1",
                        group: "flurps",
                        owner: 1,
                        pos: "a1",
                        x: 1,
                        y: 1
                      }
                    },
                    myflurps: {
                      b2: {
                        id: "unit2",
                        group: "flurps",
                        owner: 2,
                        pos: "b2",
                        x: 2,
                        y: 2
                      }
                    }
                  },
                  desc: "we send plr2 layers since start1 will switch"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
