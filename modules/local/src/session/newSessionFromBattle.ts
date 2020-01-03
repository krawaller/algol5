import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "./stringifySession/stringifyPath";

export function newSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: Math.random().toString(),
    created: Date.now(),
    updated: Date.now(),
    player: 1,
    turn: 1,
    path: stringifyPath([], 0),
    screenshot: {
      marks: [],
      units: battle.state.board.units,
    },
  };
}
