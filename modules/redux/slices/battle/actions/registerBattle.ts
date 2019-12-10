import { GameId } from "../../../../games/dist/list";
import { BattleAction } from "../types";
import { makeCreatorAndGuard } from "../../../makeCreatorAndGuard";
import { AlgolBattle } from "../../../../types";

export type RegisterBattlePayload = {
  gameId: GameId;
  battleId: string;
  battle: AlgolBattle;
  activate?: boolean;
};

export type RegisterBattleAction = BattleAction<
  "BATTLE::REGISTER_BATTLE",
  RegisterBattlePayload
>;
export const [registerBattle, isRegisterBattleAction] = makeCreatorAndGuard<
  RegisterBattleAction
>({
  type: "BATTLE::REGISTER_BATTLE",
  reducer: (draft, { gameId, battleId, battle, activate }) => {
    if (!draft.battle.games[gameId]) {
      draft.battle.games[gameId] = { battles: {} };
    }
    draft.battle.games[gameId]!.battles[battleId] = { battle, historyFrame: 0 };
    if (activate) {
      draft.battle.games[gameId]!.currentBattleId = battleId;
    }
  },
});
