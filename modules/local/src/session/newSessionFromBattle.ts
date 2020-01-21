import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "../../../encoding/path";
import { newSessionId } from "./newSessionId";

export function newSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "normal",
    player: 1,
    turn: 1,
    path: stringifyPath([], 0),
    screenshot: {
      marks: [],
      units: battle.state.board.units,
    },
  };
}
