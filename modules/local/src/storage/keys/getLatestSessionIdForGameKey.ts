import { GameId } from "../../../../games/dist/list";
import id2code from "../../../../games/dist/id2code";
import { prefix } from "./prefix";
import { configKeys } from "./configKeys";

export const getLatestSessionIdForGameKey = (gameId: GameId) =>
  `${prefix}${configKeys.latestSessionIdForGame}${id2code[gameId]}`;
