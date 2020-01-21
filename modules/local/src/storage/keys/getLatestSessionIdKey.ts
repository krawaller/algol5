import { GameId } from "../../../../games/dist/list";
import id2code from "../../../../games/dist/id2code";
import { prefix } from "./prefix";

export const getLatestSessionIdKey = (gameId: GameId) =>
  `${prefix}l${id2code[gameId]}`;
