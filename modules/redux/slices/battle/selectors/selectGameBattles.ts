import { WithAlgolBattleState, AlgolGameBattleState } from "../types";
import { GameId } from "../../../../games/dist/list";

// TODO - make it cached
export const selectGameBattles = (
  state: WithAlgolBattleState,
  gameId: GameId
): AlgolGameBattleState | null => {
  return state.battle.games[gameId] || null;
};
