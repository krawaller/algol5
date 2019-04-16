import { AlgolBattle, AlgolGame } from "../../../types";

import { firstTurn } from "./turn";

export function newBattle(game: AlgolGame): AlgolBattle {
  const turn = firstTurn(game);
  return {
    turn,
    turnNumber: 1,
    player: 1,
    history: [
      {
        player: 0,
        moves: [
          {
            description: "start",
            board: {
              marks: [],
              units: turn.steps.root.UNITDATA
            }
          }
        ]
      }
    ],
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      undos: [],
      marks: []
    }
  };
}
