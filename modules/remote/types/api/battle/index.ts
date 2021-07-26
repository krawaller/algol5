import { AlgolBattle, AlgolSession } from "../../../../types";
import { Subscriber } from "../../helpers";

export type AlgolRemoteBattleAPI = {
  load: (
    sessionId: string
  ) => Promise<{ session: AlgolSession; battle: AlgolBattle }>;
  endTurn: (otps: {
    session: AlgolSession;
    battle: AlgolBattle;
  }) => Promise<{ session: AlgolSession; battle: AlgolBattle }>;
  subscribe: Subscriber<
    { session: AlgolSession; battle: AlgolBattle },
    { sessionId: string }
  >;
};
