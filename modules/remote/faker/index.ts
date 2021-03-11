import { AlgolRemoteAPI } from "../types/api";
import { fakerChallengeAPI } from "./challenge";
import { fakerUserAPI } from "./user";

export const FakerAPI: AlgolRemoteAPI = {
  auth: fakerUserAPI,
  challenge: fakerChallengeAPI,
};
