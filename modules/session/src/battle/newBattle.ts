import { AlgolBattle, AlgolGame } from "../../../types";

import { firstTurn } from "./turn";

export function newBattle(game: AlgolGame): AlgolBattle {
  const turn = firstTurn(game);
  const firstBoard = {
    marks: [],
    units: turn.steps.root.UNITDATA
  };
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
            board: firstBoard
          }
        ]
      }
    ],
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      undos: [],
      board: firstBoard
    }
  };
}
