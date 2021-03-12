import { AlgolRemoteChallengeAPI } from "../types/api/challenge";

export const fakerChallengeAPI: AlgolRemoteChallengeAPI = {
  acceptChallenge: opts => {
    return Promise.reject(new Error("Not implemented"));
  },
  createChallenge: opts => {
    return Promise.reject(new Error("Not implemented"));
  },
  deleteChallenge: opts => {
    return Promise.reject(new Error("Not implemented"));
  },
  subscribe: {
    forGame: opts => {
      return () => {};
    },
  },
};
