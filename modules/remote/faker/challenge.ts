import { focusAtom } from "klyva";
import { AlgolRemoteChallengeAPI } from "../types/api/challenge";
import { challengesPerGame, currentGameChallenges } from "./atoms";

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
      const atom = focusAtom(challengesPerGame, optics =>
        optics.prop(opts.gameId)
      );
      opts.listener(atom.getValue());
      return atom.subscribe(opts.listener);
    },
    forCurrentGame: opts => {
      opts.listener(currentGameChallenges.getValue());
      return currentGameChallenges.subscribe(opts.listener);
    },
  },
};
