// The full remote API

import { AlgolRemoteUserAPI } from "./user";
import { AlgolRemoteChallengeAPI } from "./challenge";
import { AlgolStaticGameAPI } from "../../../types";

export type AlgolRemoteAPI = {
  auth: AlgolRemoteUserAPI;
  challenge: AlgolRemoteChallengeAPI;
  setGame: (game: AlgolStaticGameAPI | null) => void;
};
