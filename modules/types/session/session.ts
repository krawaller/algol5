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
  participants: {
    1: AlgolSessionPlayer;
    2: AlgolSessionPlayer;
  };
};

export type AlgolSessionPlayer = {
  id: string;
  name: string;
  type: "me" | "local" | "remote";
};

export const localParticipants: AlgolSession["participants"] = {
  1: { id: "LOCAL", name: "Player1", type: "local" },
  2: { id: "LOCAL", name: "Player2", type: "local" },
};
