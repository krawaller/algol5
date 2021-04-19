import { GameId } from "../../../games/dist/list";
import { AlgolSession } from "../../../types";

export type SessionContainer =
  | { session: AlgolSession; error: null; id: string }
  | { session: AlgolSession | null; error: Error; id: string };

export type LocalSessionGameState = {
  containers: Record<string, SessionContainer>;
  retrieved: false | true | Error;
};

export type LocalSessionState = {
  perGame: Partial<Record<GameId, LocalSessionGameState>>;
};
