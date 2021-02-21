import { GameId } from "../../games/dist/list";
import { AlgolSprite } from "../screenshot";

export type AlgolSession = {
  gameId: GameId;
  id: string;
  variantCode: string;
  created: number;
  updated?: number;
  path: number[];
  player: 0 | 1 | 2;
  turn: number;
  endedBy?: string;
  type: "normal" | "fork" | "imported" | "remote";
  sprites: AlgolSprite[];
};
