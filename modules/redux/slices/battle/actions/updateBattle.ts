import { GameId } from "../../../../games/dist/list";
import { BattleAction } from "../types";
import { makeCreatorAndGuard } from "../../../utils";
import { AlgolBattle } from "../../../../types";

export type UpdateBattlePayload = {
  gameId: GameId;
  battleId: string;
  battle: AlgolBattle;
  historyFrame?: number;
};

export type UpdateBattleAction = BattleAction<
  "BATTLE::UPDATE_BATTLE",
  UpdateBattlePayload
>;
export const [updateBattle, isUpdateBattleAction] = makeCreatorAndGuard<
  UpdateBattleAction
>({
  type: "BATTLE::UPDATE_BATTLE",
  reducer: (draft, { gameId, battleId, battle, historyFrame }) => {
    const battleRecord = draft.battle.games[gameId]!.battles[battleId];
    battleRecord.battle = battle;
    if (historyFrame !== undefined) {
      battleRecord.historyFrame = historyFrame;
    }
  },
});
