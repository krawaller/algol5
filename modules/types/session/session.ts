import { AlgolBattleUI } from ".";
import { AlgolBattle } from "./battle";

export type AlgolBattleSession = {
  sessionId: number;
  gameId: string;
  battle: AlgolBattle;
};
