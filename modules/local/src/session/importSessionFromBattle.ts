import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { newSessionId } from "./newSessionId";
import { board2entities } from "../../../encoding/src/entity";

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
    sprites: board2entities({
      units: battle.state.board.units,
      iconMap: battle.iconMap,
      marks: battle.gameEndedBy ? battle.state.board.marks : [],
    }),
  };
}
