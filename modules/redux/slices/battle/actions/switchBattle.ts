import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";

export type SwitchBattlePayload = {
  gameId: GameId;
  battleId: string;
};

export const [switchBattle, isSwitchBattleAction] = factory({
  type: "BATTLE::SWITCH_BATTLE",
  reducer: (draft, { gameId, battleId }: SwitchBattlePayload) => {
    draft.battle.games[gameId]!.currentBattleId = battleId;
  },
});
