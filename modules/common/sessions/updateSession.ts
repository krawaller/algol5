import { AlgolBattle, AlgolSession, AlgolIconMap } from "../../types";
import { board2sprites } from "..";

// Update the given session to match the given battle
// (which has presumably been updated via endTurn)
export function updateSession(
  battle: AlgolBattle,
  session: AlgolSession,
  iconMap: AlgolIconMap
): AlgolSession {
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
