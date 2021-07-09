import {
  AlgolBattle,
  AlgolSession,
  AlgolIconMap,
  localParticipants,
} from "../../../types";
import { newSessionId } from "../../../common/sessions";
import { board2sprites } from "../../../common";
import { GameId } from "../../../games/dist/list";

export function newSessionFromBattle(
  battle: AlgolBattle,
  iconMap: AlgolIconMap,
  gameId: GameId
): AlgolSession {
  return {
    gameId,
    id: newSessionId(),
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
    participants: localParticipants,
  };
}
