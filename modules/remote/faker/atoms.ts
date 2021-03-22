import { atom } from "klyva";
import { GameId, list } from "../../games/dist/list";
import { AlgolStaticGameAPI } from "../../types";
import { randBelow } from "../utils/random";
import { AlgolRemoteUser } from "../types/api/user";
import { AlgolRemoteChallenge } from "../types/api/challenge/challenge.type";
import { fakeChallengeByUser, fakeUserKurt, fakeUserRandy } from "./mocks";

export const currentUser = atom<AlgolRemoteUser | null>(null);

export const users = atom<AlgolRemoteUser[]>([fakeUserKurt, fakeUserRandy]);

export const currentGame = atom<AlgolStaticGameAPI | null>(null);

const withChallenges = (gameId: GameId) => {
  const ret: ChallengeById = {};
  const kurtCount = 1;
  for (let j = 0; j < kurtCount; j++) {
    const challenge = fakeChallengeByUser({ user: fakeUserKurt, gameId });
    ret[challenge.challengeId] = challenge;
  }
  const randyCount = randBelow(3) + 1;
  for (let i = 0; i < randyCount; i++) {
    const challenge = fakeChallengeByUser({ user: fakeUserRandy, gameId });
    ret[challenge.challengeId] = challenge;
  }
  return ret;
};

type ChallengeById = Record<string, AlgolRemoteChallenge>;
type ChallengesPerGame = Record<string, ChallengeById>;
const initial = Object.fromEntries(
  list.map(gameId => [gameId, withChallenges(gameId)])
) as ChallengesPerGame;

export const challengesPerGame = atom(initial);

export const currentGameChallenges = atom(
  get => {
    const api = get(currentGame);
    const challenges = get(challengesPerGame);
    return api ? challenges[api.gameId] : {};
  },
  (newVal: ChallengeById) => {
    const api = currentGame.getValue();
    const id = api ? api.gameId : "";
    if (!id) {
      throw new Error("No current game registered!");
    }
    challengesPerGame.update({
      ...challengesPerGame.getValue(),
      [id]: newVal,
    });
  }
);
