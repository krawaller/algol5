import { GameId } from "../../../../games/dist/list";
import id2code from "../../../../games/dist/id2code";
import { prefix } from "./prefix";
import { configKeys } from "./configKeys";

export const getSessionStorageKey = (gameId: GameId, finished?: boolean) =>
  `${prefix}${configKeys.sessionStorage}${id2code[gameId]}${
    finished ? "g" : ""
  }`;
