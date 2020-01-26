import { AlgolBattle, AlgolLocalBattle, AlgolIconMap } from "../../../types";
import { board2sprites } from "../../../encoding/src/sprites";

export function updateSession(
  battle: AlgolBattle,
  session: AlgolLocalBattle,
  iconMap: AlgolIconMap
): AlgolLocalBattle {
  return {
    ...session,
    updated: Date.now(),
    sprites: board2sprites({
      marks: battle.state.board.marks,
      units: battle.state.board.units,
      iconMap: iconMap,
    }),
    endedBy: battle.gameEndedBy,
    turn: battle.turnNumber,
    player: battle.gameEndedBy ? battle.winner! : battle.player,
    path: battle.path,
  };
}
