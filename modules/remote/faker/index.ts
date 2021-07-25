import { AlgolRemoteAPI } from "../types/api";
import { fakerChallengeAPI } from "./challenge";
import { fakerBattleAPI } from "./battle";
import { fakerUserAPI } from "./user";
import { currentGame } from "./atoms";

export const FakerAPI: AlgolRemoteAPI = {
  auth: fakerUserAPI,
  challenge: fakerChallengeAPI,
  battle: fakerBattleAPI,
  game: {
    setGameAPI: gameAPI => {
      currentGame.update(gameAPI);
    },
    getGameAPI: () => currentGame.getValue(),
  },
};
