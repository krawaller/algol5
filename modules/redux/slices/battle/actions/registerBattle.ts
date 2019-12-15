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
    draft.battles[battleId] = { battle, historyFrame: 0, gameId };
    if (activate) {
      draft.games[gameId]!.currentBattleId = battleId;
    }
  },
});
