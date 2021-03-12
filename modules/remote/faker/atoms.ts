import { atom } from "klyva";
import { GameId, list } from "../../games/dist/list";
import { AlgolStaticGameAPI } from "../../types";
import { AlgolRemoteUser } from "../types/api/user";
import { AlgolRemoteChallenge } from "../types/api/challenge/challenge.type";

export const currentUser = atom<AlgolRemoteUser | null>(null);

const randy: AlgolRemoteUser = {
  userId: "RANDY",
  userName: "Randy",
  password: "heydontbeme",
};

const kurt: AlgolRemoteUser = {
  userId: "thisisaveryrandomguid",
  userName: "Kurt",
  password: "kurt123",
};

export const users = atom<AlgolRemoteUser[]>([kurt, randy]);

export const currentGame = atom<AlgolStaticGameAPI | null>(null);

const withRandyChallenge = (gameId: GameId): ChallengeById => {
  const id = Math.random()
    .toString()
    .slice(2);
  return {
    [id]: {
      challengeId: id,
      gameId,
      issuer: randy.userId,
      lookingFor: ([0, 1, 2] as const)[Math.floor(Math.random() * 3)],
      timestamp: Date.now(),
    },
  };
};

type ChallengeById = Record<string, AlgolRemoteChallenge>;
type ChallengesPerGame = Record<string, ChallengeById>;
const initial = Object.fromEntries(
  list.map(gameId => [gameId, withRandyChallenge(gameId)])
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
