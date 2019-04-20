import { AlgolBattleUI } from ".";
import { AlgolBattle } from "./battle";

export type AlgolBattleSession = {
  battleId: number;
  gameId: string;
  battle: AlgolBattle;
};
