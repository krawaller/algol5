import { GameId } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";

export const getTagsForGame = (gameId: GameId): string[] => meta[gameId].tags;
