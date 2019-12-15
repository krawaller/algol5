import { AlgolBattleInfo } from "../types";
import { AppState } from "../../../types";
import { GameId } from "../../../../games/dist/list";
import { selectGameBattles } from "./selectGameBattles";

// TODO - make it cached
export const selectCurrentBattleInfo = (
  state: AppState,
  gameId: GameId
): AlgolBattleInfo | null => {
  const game = state.games[gameId];
  return state.battles[game.currentBattleId!] || null;
};
