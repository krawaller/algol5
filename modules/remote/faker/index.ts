import { AlgolRemoteAPI } from "../types/api";
import { fakerChallengeAPI } from "./challenge";
import { fakerUserAPI } from "./user";
import { game } from "./atoms";

export const FakerAPI: AlgolRemoteAPI = {
  auth: fakerUserAPI,
  challenge: fakerChallengeAPI,
  setGame: gameAPI => {
    game.update(gameAPI);
  },
};
