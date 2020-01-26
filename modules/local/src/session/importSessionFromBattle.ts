import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { newSessionId } from "./newSessionId";

export function importSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "imported",
    player: battle.player,
    turn: battle.turnNumber,
    path: battle.path,
    ...(battle.gameEndedBy && {
      endedBy: battle.gameEndedBy,
    }),
    screenshot: {
      marks: battle.gameEndedBy ? battle.state.board.marks : [],
      units: battle.state.board.units,
      potentialMarks: [],
    },
  };
}
