import { AlgolBattle, AlgolGame, AlgolBoardState } from "../../../types";

import { firstTurn } from "./turn";

export function newBattle(game: AlgolGame): AlgolBattle {
  const turn = firstTurn(game);
  const firstBoard: AlgolBoardState = {
    marks: [],
    units: turn.steps.root.UNITDATA,
    anim: { enterFrom: {}, exitTo: {}, ghosts: [] }
  };
  return {
    turn,
    turnNumber: 1,
    player: 1,
    history: [
      {
        player: 0,
        turn: 0,
        description: { line: [{ text: "Let the battle begin!" }] },
        board: firstBoard
      }
    ],
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      undo: null,
      board: firstBoard
    }
  };
}
