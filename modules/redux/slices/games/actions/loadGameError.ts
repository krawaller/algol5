import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";

export type LoadGameErrorPayload = {
  gameId: GameId;
  error: string;
};

export const [loadGameError, isLoadGameErrorAction] = factory({
  type: "GAMES::LOAD_GAME_ERROR",
  reducer: (draft, { gameId, error }: LoadGameErrorPayload) => {
    draft.games[gameId].loading = false;
    draft.games[gameId].error = error;
  },
});
