import { GameId } from "../../../games/dist/list";
import { AlgolBattle } from "../../../types";
import { Action } from "../../types";

export type BattleAction<Type extends string, Payload> = Action<
  Type,
  Payload,
  WithAlgolBattleState
>;

export type AlgolBattleState = {
  games: Partial<{ [idx in GameId]: AlgolGameBattleState }>;
};

export type AlgolBattleInfo = {
  battle: AlgolBattle;
  historyFrame: number;
};

export type AlgolGameBattleState = {
  battles: {
    [id: string]: AlgolBattleInfo;
  };
  currentBattleId?: string;
};

export interface WithAlgolBattleState {
  battle: AlgolBattleState;
}
