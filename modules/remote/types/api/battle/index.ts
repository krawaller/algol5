import { AlgolBattle, AlgolSession } from "../../../../types";

export type AlgolRemoteBattleAPI = {
  load: (
    sessionId: string
  ) => Promise<{ session: AlgolSession; battle: AlgolBattle }>;
  endTurn: (otps: {
    session: AlgolSession;
    battle: AlgolBattle;
  }) => Promise<{ session: AlgolSession; battle: AlgolBattle }>;
};
