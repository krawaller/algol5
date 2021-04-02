// The full remote API

import { AlgolRemoteUserAPI } from "./user";
import { AlgolRemoteChallengeAPI } from "./challenge";
import { AlgolStaticGameAPI } from "../../../types";

export type AlgolRemoteAPI = {
  auth: AlgolRemoteUserAPI;
  challenge: AlgolRemoteChallengeAPI;
  game: {
    setGameAPI: (game: AlgolStaticGameAPI | null) => void;
    getGameAPI: () => AlgolStaticGameAPI | null;
  };
};
