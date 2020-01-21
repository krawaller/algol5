import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { newSessionId } from "./newSessionId";

export function forkSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "fork",
    player: battle.player,
    turn: battle.turnNumber,
    path: battle.path,
    screenshot: {
      marks: [],
      units: battle.state.board.units,
    },
  };
}
