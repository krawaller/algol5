import { GameId } from "../../../games/dist/list";
import { AlgolBattle } from "../../../types";
import { ReducingAction } from "../../types";

export type BattleAction<Type extends string, Payload> = ReducingAction<
  Type,
  Payload,
  WithAlgolBattleState
>;

export type AlgolBattleState = {
  games: Partial<{ [idx in GameId]: AlgolGameBattleState }>;
};

export type AlgolBattleInfo = {
  battle: AlgolBattle;
};

export type AlgolGameBattleState = {
  battles: {
    [id: string]: AlgolBattleInfo;
  };
};

export interface WithAlgolBattleState {
  battle: AlgolBattleState;
}
