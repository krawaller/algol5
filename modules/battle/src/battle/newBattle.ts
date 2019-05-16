import {
  AlgolBattle,
  AlgolGame,
  AlgolBoardState,
  AlgolAnimCompiled
} from "../../../types";

const emptyAnim: AlgolAnimCompiled = { enterFrom: {}, exitTo: {}, ghosts: [] };

const identifyMark = /^[a-z][0-9]+$/;

import { firstTurn } from "./turn";

export function newBattle(game: AlgolGame): AlgolBattle {
  const turn = firstTurn(game);
  const firstBoard: AlgolBoardState = {
    marks: [],
    units: turn.steps.root.UNITDATA,
    anim: emptyAnim,
    potentialMarks: Object.keys(turn.steps.root.LINKS.actions).filter(action =>
      action.match(identifyMark)
    )
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
