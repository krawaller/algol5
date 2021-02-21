import { AlgolBattle, AlgolSession, AlgolIconMap } from "../../../types";
import { newSessionId } from "./newSessionId";
import { board2sprites } from "../../../common";

export function newSessionFromBattle(
  battle: AlgolBattle,
  iconMap: AlgolIconMap
): AlgolSession {
  return {
    id: newSessionId(),
    gameId: battle.gameId,
    created: Date.now(),
    variantCode: battle.variant.code,
    type: "normal",
    player: 1,
    turn: 1,
    path: [],
    sprites: board2sprites({
      marks: [],
      units: battle.state.board.units,
      iconMap: iconMap,
    }),
  };
}
