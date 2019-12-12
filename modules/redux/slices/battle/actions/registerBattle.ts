import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { AlgolBattle } from "../../../../types";

export type RegisterBattlePayload = {
  gameId: GameId;
  battleId: string;
  battle: AlgolBattle;
  activate?: boolean;
};

export const [registerBattle, isRegisterBattleAction] = factory({
  type: "BATTLE::REGISTER_BATTLE",
  reducer: (
    draft,
    { gameId, battleId, battle, activate }: RegisterBattlePayload
  ) => {
    if (!draft.battle.games[gameId]) {
      draft.battle.games[gameId] = { battles: {} };
    }
    draft.battle.games[gameId]!.battles[battleId] = { battle, historyFrame: 0 };
    if (activate) {
      draft.battle.games[gameId]!.currentBattleId = battleId;
    }
  },
});
