import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "../../../encoding/path";

export function updateSession(
  battle: AlgolBattle,
  session: AlgolLocalBattle
): AlgolLocalBattle {
  return {
    ...session,
    updated: Date.now(),
    screenshot: {
      marks: battle.state.board.marks,
      units: battle.state.board.units,
    },
    endedBy: battle.gameEndedBy,
    turn: battle.turnNumber,
    player: battle.gameEndedBy ? battle.winner! : battle.player,
    path: stringifyPath(battle.path, 0),
  };
}
