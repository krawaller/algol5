import { GameId } from "../../../../games/dist/list";
import { AlgolRemoteChallenge } from "./challenge.type";

export type AlgolRemoteChallengeSubs = {
  perGame: (opts: {
    gameId: GameId;
    listener: (challenges: AlgolRemoteChallenge[]) => void;
  }) => void;
};
