import { WithAlgolBattleState, AlgolBattleInfo } from "../types";
import { GameId } from "../../../../games/dist/list";
import { selectGameBattles } from "./selectGameBattles";

// TODO - make it cached
export const selectCurrentBattleInfo = (
  state: WithAlgolBattleState,
  gameId: GameId
): AlgolBattleInfo | null => {
  const gameBattleState = selectGameBattles(state, gameId);
  if (!gameBattleState) return null;
  if (!gameBattleState.currentBattleId) return null;
  return gameBattleState.battles[gameBattleState.currentBattleId];
};
