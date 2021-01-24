import { AlgolRemoteChallengeActions } from "./challenge.actions";
import { AlgolRemoteChallengeSubs } from "./challenge.subs";
export * from "./challenge.type";

export type AlgolRemoteChallengeAPI = {
  actions: AlgolRemoteChallengeActions;
  subs: AlgolRemoteChallengeSubs;
};
