import { AlgolBattleUI } from "./ui";
import { AlgolBattle } from "./battle";

export type AlgolStatefulGameAPI = {
  newBattle: () => {
    initialUI: AlgolBattleUI;
    performAction: (
      action: "endTurn" | "undo" | "mark" | "command",
      arg?: string
    ) => AlgolBattleUI;
  };
};

export type AlgolStaticGameAPI = {
  newBattle: () => AlgolBattle;
  performAction: (
    battle: AlgolBattle,
    action: "endTurn" | "undo" | "mark" | "command",
    arg?: string
  ) => AlgolBattle;
};
