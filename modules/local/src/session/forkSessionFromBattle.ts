import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "./stringifySession/stringifyPath";
import { newSessionId } from "./newSessionId";

export function forkSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "fork",
    player: battle.player,
    turn: battle.turnNumber,
    path: stringifyPath(battle.path, 0),
    screenshot: {
      marks: [],
      units: battle.state.board.units,
    },
  };
}
