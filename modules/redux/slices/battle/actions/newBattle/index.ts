import { GameId } from "../../../../../games/dist/list";
import { BattleAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";
import { AlgolBattle } from "../../../../../types";

export type NewBattlePayload = {
  gameId: GameId;
  battleId: string;
  battle: AlgolBattle;
};

export type NewBattleAction = BattleAction<
  "BATTLE::NEW_BATTLE",
  NewBattlePayload
>;
export const [newBattle, isNewBattleAction] = makeCreatorAndGuard<
  NewBattleAction
>("BATTLE::NEW_BATTLE", (draft, { gameId, battleId, battle }) => {
  if (!draft.battle.games[gameId]) {
    draft.battle.games[gameId] = { battles: {} };
  }
  draft.battle.games[gameId]!.battles[battleId] = { battle };
});
