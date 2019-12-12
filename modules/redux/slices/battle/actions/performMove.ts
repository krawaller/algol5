import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { updateBattle } from "./updateBattle";

export type PerformMovePayload = {
  gameId: GameId;
  action: "command" | "mark" | "undo" | "endTurn";
  arg?: string;
};

export const [performMove, isPerformMoveAction] = factory({
  type: "BATTLE::PERFORM_MOVE",
  reducer: (draft, payload: PerformMovePayload) => {},
  consequence: async ({ dispatch, deps, action, getState }) => {
    const { action: kind, arg, gameId } = action.payload;
    const currentGame = getState().battle.games[gameId]!;
    const currentBattle =
      currentGame.battles[currentGame.currentBattleId!].battle;
    const api = await deps.getGameAPI(gameId);

    const updatedBattle = api.performAction(currentBattle, kind, arg);
    dispatch(
      updateBattle({
        gameId,
        battle: updatedBattle,
        battleId: currentGame.currentBattleId!,
      })
    );
  },
});
