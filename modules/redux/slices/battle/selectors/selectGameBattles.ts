import { WithAlgolBattleState, AlgolBattleInfo } from "../types";
import { GameId } from "../../../../games/dist/list";

// TODO - make it cached
export const selectGameBattles = (
  state: WithAlgolBattleState,
  gameId: GameId
) => {
  const ret: Record<string, AlgolBattleInfo> = {};
  for (const [battleId, bInfo] of Object.entries(state.battles)) {
    if (bInfo.gameId === gameId) {
      ret[battleId] = bInfo;
    }
  }
  return ret;
};
