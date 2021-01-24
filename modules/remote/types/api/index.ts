// The full remote API

import { AlgolRemoteUserAPI } from "./user";
import { AlgolRemoteChallengeAPI } from "./challenge";

export type AlgolRemoteAPI = AlgolRemoteUserAPI & AlgolRemoteChallengeAPI;
