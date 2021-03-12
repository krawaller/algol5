import { AlgolRemoteAPI } from "../types/api";
import { fakerChallengeAPI } from "./challenge";
import { fakerUserAPI } from "./user";
import { currentGame } from "./atoms";

export const FakerAPI: AlgolRemoteAPI = {
  auth: fakerUserAPI,
  challenge: fakerChallengeAPI,
  setGame: gameAPI => {
    currentGame.update(gameAPI);
  },
};
