import { GameId } from "../../../games/dist/list";

export const getSessionStorageKey = (gameId: GameId, finished?: boolean) =>
  `Algol_${gameId}_${finished ? "finished" : "active"}`;
