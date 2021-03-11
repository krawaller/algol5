// The full remote API

import { AlgolRemoteUserAPI } from "./user";
import { AlgolRemoteChallengeAPI } from "./challenge";

export type AlgolRemoteAPI = {
  auth: AlgolRemoteUserAPI;
  challenge: AlgolRemoteChallengeAPI;
};
