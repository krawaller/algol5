import { GameId } from "../../../games/dist/list";
import { AlgolBattle } from "../../../types";
import { Action } from "../../types";

export type BattleAction<Type extends string, Payload> = Action<
  Type,
  Payload,
  WithAlgolBattleState
>;

export type AlgolBattleState = {
  games: Partial<Record<GameId, AlgolGameBattleState>>;
};

export type AlgolBattleInfo = {
  battle: AlgolBattle;
  historyFrame: number;
};

export type AlgolGameBattleState = {
  battles: Record<string, AlgolBattleInfo>;
  currentBattleId?: string;
};

export interface WithAlgolBattleState {
  battle: AlgolBattleState;
}
