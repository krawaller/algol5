import { AlgolBattle, AlgolGame } from "../../../types";

import { newBattleTurn } from "./turn";

function newBattle(game: AlgolGame): AlgolBattle {
  return {
    turn: newBattleTurn(game),
    turnNumber: 1,
    player: 1,
    history: [],
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      undos: []
    }
  };
}
