// The full remote API

import { AlgolRemoteUserAPI } from "./user";
import { AlgolRemoteChallengeAPI } from "./challenge";
import { AlgolRemoteBattleAPI } from "./battle";
import { AlgolStaticGameAPI } from "../../../types";

export type AlgolRemoteAPI = {
  auth: AlgolRemoteUserAPI;
  challenge: AlgolRemoteChallengeAPI;
  battle: AlgolRemoteBattleAPI;
  game: {
    setGameAPI: (game: AlgolStaticGameAPI | null) => void;
    getGameAPI: () => AlgolStaticGameAPI | null;
  };
};
