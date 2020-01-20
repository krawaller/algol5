import { GameId } from "../../../../games/dist/list";
import id2code from "../../../../games/dist/id2code";

export const getLatestSessionIdKey = (gameId: GameId) =>
  `Algol_l${id2code[gameId]}`;
