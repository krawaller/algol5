import { GameId } from "../../../../../games/dist/list";
import { BattleAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type SwitchBattlePayload = {
  gameId: GameId;
  battleId: string;
};

export type SwitchBattleAction = BattleAction<
  "BATTLE::SWITCH_BATTLE",
  SwitchBattlePayload
>;
export const [switchBattle, isSwitchBattleAction] = makeCreatorAndGuard<
  SwitchBattleAction
>({
  type: "BATTLE::SWITCH_BATTLE",
  reducer: (draft, { gameId, battleId }) => {
    draft.battle.games[gameId]!.currentBattleId = battleId;
  },
});
