import { GameId } from "../../../games/dist/list";
import id2code from "../../../games/dist/id2code";

export const getSessionStorageKey = (gameId: GameId, finished?: boolean) =>
  `Algol_s${id2code[gameId]}${finished ? "g" : ""}`;
