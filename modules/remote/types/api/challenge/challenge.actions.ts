import { GameId } from "../../../../games/dist/list";
import { AlgolRemoteChallenge } from "./challenge.type";

export type AlgolRemoteChallengeActions = {
  acceptChallenge: (opts: {
    gameId: GameId;
    challengeId: string;
    as: 0 | 1 | 2;
  }) => Promise<0 | 1 | 2>;
  createChallenge: (opts: {
    lookingFor: 0 | 1 | 2;
    gameId: GameId;
    variantCode: string;
  }) => Promise<AlgolRemoteChallenge>;
  deleteChallenge: (opts: {
    challengeId: string;
    gameId: GameId;
  }) => Promise<true>;
};
