import { GameId } from "../../../../games/dist/list";
import id2code from "../../../../games/dist/id2code";
import { prefix } from "./prefix";

export const getSessionStorageKey = (gameId: GameId, finished?: boolean) =>
  `${prefix}s${id2code[gameId]}${finished ? "g" : ""}`;
