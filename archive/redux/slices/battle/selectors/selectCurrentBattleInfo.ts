import { AlgolBattleInfo } from "../types";
import { AppState } from "../../../types";
import { GameId } from "../../../../games/dist/list";

// TODO - make it cached
export const selectCurrentBattleInfo = (
  state: AppState,
  gameId: GameId
): AlgolBattleInfo | null => {
  const game = state.games[gameId];
  return (game && state.battles[game.currentBattleId!]) || null;
};
