import { AlgolBattleUI } from "./ui";
import { AlgolBattle } from "./battle";
import { GameId } from "../../games/dist/list";

export type AlgolStatefulGameAPI = {
  gameId: GameId;
  newBattle: () => {
    initialUI: AlgolBattleUI;
    performAction: (
      action: "endTurn" | "undo" | "mark" | "command",
      arg?: string
    ) => AlgolBattleUI;
  };
};

export type AlgolStaticGameAPI = {
  gameId: GameId;
  newBattle: () => AlgolBattle;
  performAction: (
    battle: AlgolBattle,
    action: "endTurn" | "undo" | "mark" | "command",
    arg?: string
  ) => AlgolBattle;
  getBattleUI: (battle: AlgolBattle) => AlgolBattleUI;
};
