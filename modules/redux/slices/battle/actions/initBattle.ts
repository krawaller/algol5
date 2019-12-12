import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { registerBattle } from "./registerBattle";

export type InitBattlePayload = {
  gameId: GameId;
};

export const [initBattle, isInitBattleAction] = factory({
  type: "BATTLE::INIT_BATTLE",
  reducer: (draft, { gameId }: InitBattlePayload) => {},
  consequence: async ({ dispatch, deps, action }) => {
    const api = await deps.getGameAPI(action.payload.gameId);
    const battleId = Math.random().toString(); // TODO - better?
    dispatch(
      registerBattle({
        gameId: action.payload.gameId,
        battle: api.newBattle(),
        battleId,
        activate: true,
      })
    );
  },
});
