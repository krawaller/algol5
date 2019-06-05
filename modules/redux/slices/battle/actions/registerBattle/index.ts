import { GameId } from "../../../../../games/dist/list";
import { BattleAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";
import { AlgolBattle } from "../../../../../types";

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
>(
  "BATTLE::REGISTER_BATTLE",
  (draft, { gameId, battleId, battle, activate }) => {
    if (!draft.battle.games[gameId]) {
      draft.battle.games[gameId] = { battles: {} };
    }
    draft.battle.games[gameId]!.battles[battleId] = { battle };
    if (activate) {
      draft.battle.games[gameId]!.currentBattle = battleId;
    }
  }
);
