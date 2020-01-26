import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { newSessionId } from "./newSessionId";

export function newSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "normal",
    player: 1,
    turn: 1,
    path: [],
    screenshot: {
      marks: [],
      units: battle.state.board.units,
      potentialMarks: [],
    },
  };
}
