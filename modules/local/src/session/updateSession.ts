import { AlgolBattle, AlgolLocalBattle } from "../../../types";

export function updateSession(
  battle: AlgolBattle,
  session: AlgolLocalBattle
): AlgolLocalBattle {
  return {
    ...session,
    updated: Date.now(),
    screenshot: {
      marks: battle.state.board.marks,
      units: battle.state.board.units, // TODO - ensure icon here?
    },
    endedBy: battle.gameEndedBy,
    turn: battle.turnNumber,
    player: battle.gameEndedBy ? battle.winner! : battle.player,
    path: battle.path,
  };
}
