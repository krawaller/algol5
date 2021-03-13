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

const withRandyChallenges = (gameId: GameId) => {
  const ret: ChallengeById = {};
  for (let i = 0; i < randBelow(3) + 1; i++) {
    const challenge = fakeChallengeByUser({ user: fakeUserRandy, gameId });
    ret[challenge.challengeId] = challenge;
  }
  return ret;
};

type ChallengeById = Record<string, AlgolRemoteChallenge>;
type ChallengesPerGame = Record<string, ChallengeById>;
const initial = Object.fromEntries(
  list.map(gameId => [gameId, withRandyChallenges(gameId)])
) as ChallengesPerGame;

export const challengesPerGame = atom(initial);

export const currentGameChallenges = atom(
  get => get(challengesPerGame)[get(currentGame)?.gameId ?? ""] ?? {},
  (newVal: ChallengeById) => {
    const id = currentGame.getValue()?.gameId;
    if (!id) {
      throw new Error("No current game registered!");
    }
    challengesPerGame.update({
      ...challengesPerGame.getValue(),
      [id]: newVal,
    });
  }
);
