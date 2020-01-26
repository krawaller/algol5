import { AlgolBattle, AlgolLocalBattle, AlgolIconMap } from "../../../types";
import { newSessionId } from "./newSessionId";
import { board2sprites } from "../../../encoding/src/sprites";

export function importSessionFromBattle(
  battle: AlgolBattle,
  iconMap: AlgolIconMap
): AlgolLocalBattle {
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
    sprites: board2sprites({
      units: battle.state.board.units,
      iconMap: iconMap,
      marks: battle.gameEndedBy ? battle.state.board.marks : [],
    }),
  };
}
