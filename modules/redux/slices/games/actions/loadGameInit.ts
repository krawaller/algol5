import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { loadGameSuccess } from "./loadGameSuccess";
import { loadGameError } from "./loadGameError";

export type LoadGameInitPayload = {
  gameId: GameId;
};

export const [loadGameInit, isLoadGameInitAction] = factory({
  type: "GAMES::LOAD_GAME_INIT",
  reducer: (draft, { gameId }: LoadGameInitPayload) => {
    draft.games[gameId].loading = true;
    draft.games[gameId].loaded = false;
    delete draft.games[gameId].error;
  },
  consequence: async ({ dispatch, deps, action, getState }) => {
    const { gameId } = action.payload;
    const { games } = getState();
    // load already in progress
    if (games[gameId].loading) {
      return;
    }
    // already have downloaded, just reset loading flag
    if (games[gameId].loaded) {
      dispatch(loadGameSuccess({ gameId }));
      return;
    }
    // get game for realz!
    deps
      .loadGame(gameId)
      .then(() => dispatch(loadGameSuccess({ gameId })))
      .catch(error => dispatch(loadGameError({ gameId, error })));
  },
});
