import { GameId, list } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";

export const getGamesForTag = (tagId: string): GameId[] =>
  list.filter(gameId => meta[gameId].tags.includes(tagId));
