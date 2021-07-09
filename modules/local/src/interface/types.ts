import { GameId } from "../../../games/dist/list";
import { AlgolSession } from "../../../types";

export type SessionContainer =
  | { session: AlgolSession; error: null; id: string }
  | { session: AlgolSession | null; error: Error; id: string };

export type GameSessions = {
  containers: Record<string, SessionContainer>;
  retrieved: false | true | Error;
};

export type LocalSessionState = Record<GameId, GameSessions>;
