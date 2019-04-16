import { AlgolBattle, AlgolGame } from "../../../types";

import { firstTurn } from "./turn";

export function newBattle(game: AlgolGame): AlgolBattle {
  return {
    turn: firstTurn(game),
    turnNumber: 1,
    player: 1,
    history: [], // TODO <--- add 0 here!
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      undos: [],
      marks: []
    }
  };
}
