import { GameId } from "../../games/dist/list";

export type AlgolBattleSave = {
  gameId: GameId;
  variantCode: string;
  path: number[];
  player: 0 | 1 | 2;
  turn: number;
  ended?: boolean;
};
