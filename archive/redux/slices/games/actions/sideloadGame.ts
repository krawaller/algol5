import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { loadGameSuccess } from "./loadGameSuccess";
import { loadGameError } from "./loadGameError";
import { AlgolGame } from "../../../../types";
import { initBattle } from "../../battle";

export type SideloadGamePayload = {
  gameId: GameId;
  game: AlgolGame;
  startNewBattle?: boolean;
};

export const [sideloadGame, isSideloadGameAction] = factory({
  type: "GAMES::SIDELOAD_GAME",
  reducer: (draft, payload: SideloadGamePayload) => {},
  consequence: ({ dispatch, deps, action }) => {
    const { gameId, game, startNewBattle } = action.payload;
    deps.sideloadGame(gameId, game);
    dispatch(loadGameSuccess({ gameId }));
    if (startNewBattle) {
      dispatch(initBattle({ gameId }));
    }
  },
});
