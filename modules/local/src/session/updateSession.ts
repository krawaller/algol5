import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { board2entities } from "../../../encoding/src/entity";

export function updateSession(
  battle: AlgolBattle,
  session: AlgolLocalBattle
): AlgolLocalBattle {
  return {
    ...session,
    updated: Date.now(),
    sprites: board2entities({
      marks: battle.state.board.marks,
      units: battle.state.board.units,
      iconMap: battle.iconMap,
    }),
    endedBy: battle.gameEndedBy,
    turn: battle.turnNumber,
    player: battle.gameEndedBy ? battle.winner! : battle.player,
    path: battle.path,
  };
}
