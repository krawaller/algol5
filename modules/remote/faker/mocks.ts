import { GameId } from "../../games/dist/list";
import { AlgolRemoteChallenge } from "../types/api/challenge";
import { AlgolRemoteUser } from "../types/api/user";
import { randBelow } from "../utils/random";

export const fakeUserRandy: AlgolRemoteUser = {
  userId: "RANDY",
  userName: "Randy",
  password: "heydontbeme",
  gravatarHash: "0bb93d13ba17249145c60bdf0f509bc7",
};

export const fakeUserKurt: AlgolRemoteUser = {
  userId: "thisisaveryrandomguid",
  userName: "Kurt",
  password: "kurt123",
};

type FakeChallengeByUserOpts = {
  user: AlgolRemoteUser;
  gameId: GameId;
};
export const fakeChallengeByUser = (
  opts: FakeChallengeByUserOpts
): AlgolRemoteChallenge => ({
  challengeId: Math.random()
    .toString()
    .slice(2),
  gameId: opts.gameId,
  issuer: {
    userId: opts.user.userId,
    userName: opts.user.userName,
    gravatarHash: opts.user.gravatarHash,
  },
  lookingFor: randBelow(3) as 0 | 1 | 2,
  timestamp: Date.now() * Math.random(),
});
