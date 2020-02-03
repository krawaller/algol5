import { AlgolBattle, AlgolLocalBattle, AlgolIconMap } from "../../../types";
import { newSessionId } from "./newSessionId";
import { board2sprites } from "../../../common";

export function forkSessionFromBattle(
  battle: AlgolBattle,
  iconMap: AlgolIconMap
): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "fork",
    player: battle.player,
    turn: battle.turnNumber,
    path: battle.path,
    sprites: board2sprites({
      marks: [],
      units: battle.state.board.units,
      iconMap: iconMap,
    }),
  };
}
