import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { AlgolBattle } from "../../../../types";

export type UpdateBattlePayload = {
  gameId: GameId;
  battleId: string;
  battle: AlgolBattle;
  historyFrame?: number;
};

export const [updateBattle, isUpdateBattleAction] = factory({
  type: "BATTLE::UPDATE_BATTLE",
  reducer: (
    draft,
    { gameId, battleId, battle, historyFrame }: UpdateBattlePayload
  ) => {
    const battleRecord = draft.battle.games[gameId]!.battles[battleId];
    battleRecord.battle = battle;
    if (historyFrame !== undefined) {
      battleRecord.historyFrame = historyFrame;
    }
  },
});
