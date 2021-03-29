import { focusAtom } from "klyva";
import produce from "immer";
import {
  AlgolRemoteChallenge,
  AlgolRemoteChallengeAPI,
} from "../types/api/challenge";
import { challengesPerGame, currentGameChallenges, currentUser } from "./atoms";

export const fakerChallengeAPI: AlgolRemoteChallengeAPI = {
  acceptChallenge: opts => {
    return Promise.reject(new Error("Not implemented"));
  },
  createChallenge: opts =>
    new Promise(resolve => {
      const { gameId, lookingFor, variantCode } = opts;
      setTimeout(() => {
        challengesPerGame.update(c =>
          produce(c, draft => {
            const user = currentUser.getValue()!;
            const newChallenge: AlgolRemoteChallenge = {
              challengeId: Math.random()
                .toString()
                .slice(2),
              gameId,
              issuer: {
                userId: user.userId,
                userName: user.userName,
                gravatarHash: user.gravatarHash,
              },
              lookingFor,
              variantCode,
              timestamp: Date.now(),
            };
            draft[gameId][newChallenge.challengeId] = newChallenge;
            resolve(newChallenge);
          })
        );
      }, 2000);
    }),
  deleteChallenge: opts =>
    new Promise(resolve => {
      const { challengeId, gameId } = opts.challenge;
      challengesPerGame.update(c =>
        produce(c, draft => {
          // TODO - put in common logic
          draft[gameId][challengeId].deleting = true;
        })
      );
      setTimeout(() => {
        challengesPerGame.update(c =>
          produce(c, draft => {
            delete draft[gameId][challengeId];
          })
        );
        resolve(true);
      }, 2000);
    }),
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
