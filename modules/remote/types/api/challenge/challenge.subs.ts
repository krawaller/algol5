import { GameId } from "../../../../games/dist/list";
import { Subscriber } from "../../helpers";
import { AlgolRemoteChallenge } from "./challenge.type";

export type AlgolRemoteChallengeSubs = {
  forGame: Subscriber<Record<string, AlgolRemoteChallenge>, { gameId: GameId }>;
};
