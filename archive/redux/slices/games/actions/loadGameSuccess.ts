import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";

export type LoadGameSuccessPayload = {
  gameId: GameId;
};

export const [loadGameSuccess, isLoadGameSuccessAction] = factory({
  type: "GAMES::LOAD_GAME_SUCCESS",
  reducer: (draft, { gameId }: LoadGameSuccessPayload) => {
    draft.games[gameId].loading = false;
    draft.games[gameId].loaded = true;
  },
});
