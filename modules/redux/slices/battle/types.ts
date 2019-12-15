import { AlgolBattle } from "../../../types";
import { Action } from "../../types";
import { GameId } from "../../../games/dist/list";

export type BattleAction<Type extends string, Payload> = Action<
  Type,
  Payload,
  WithAlgolBattleState
>;

export type AlgolBattleInfo = {
  battle: AlgolBattle;
  historyFrame: number;
  gameId: GameId;
};

export interface WithAlgolBattleState {
  battles: Record<string, AlgolBattleInfo>;
}
