import {
  AlgolBattle,
  AlgolSession,
  AlgolIconMap,
  localParticipants,
} from "../../../types";
import { newSessionId } from "./newSessionId";
import { board2sprites } from "../../../common";
import { GameId } from "../../../games/dist/list";

export function importSessionFromBattle(
  battle: AlgolBattle,
  iconMap: AlgolIconMap,
  gameId: GameId
): AlgolSession {
  return {
    gameId,
    id: newSessionId(),
    variantCode: battle.variant.code,
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
    participants: localParticipants,
  };
}
