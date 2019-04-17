import { AlgolSessionUI } from ".";
import { AlgolBattle } from "./battle";

export type AlgolSession = {
  sessionId: number;
  gameId: string;
  battle: AlgolBattle;
};
