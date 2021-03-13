import { GameId } from "../../games/dist/list";
import { AlgolRemoteUser } from "../types/api/user";
import { randBelow } from "../utils/random";

export const fakeUserRandy: AlgolRemoteUser = {
  userId: "RANDY",
  userName: "Randy",
  password: "heydontbeme",
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
export const fakeChallengeByUser = (opts: FakeChallengeByUserOpts) => ({
  challengeId: Math.random()
    .toString()
    .slice(2),
  gameId: opts.gameId,
  issuer: opts.user.userId,
  lookingFor: randBelow(3) as 0 | 1 | 2,
  timestamp: Date.now() * Math.random(),
});
