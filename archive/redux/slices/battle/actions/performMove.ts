import { factory } from "../../../factory";
import { updateBattle } from "./updateBattle";

export type PerformMovePayload = {
  battleId: string;
  action: "command" | "mark" | "undo" | "endTurn";
  arg?: string;
};

export const [performMove, isPerformMoveAction] = factory({
  type: "BATTLE::PERFORM_MOVE",
  reducer: (draft, payload: PerformMovePayload) => {},
  consequence: ({ dispatch, deps, action, getState }) => {
    const { action: kind, arg, battleId } = action.payload;
    const { battle, gameId } = getState().battles[battleId];

    const api = deps.loadedGames[gameId]!.api;

    const updatedBattle = api.performAction(battle, kind, arg);
    dispatch(
      updateBattle({
        battle: updatedBattle,
        battleId,
      })
    );
  },
});
