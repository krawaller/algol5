import { AlgolBattleUI } from "./ui";

export type AlgolGameAPI = {
  newBattle: () => {
    initialUI: AlgolBattleUI;
    performAction: (
      action: "endTurn" | "undo" | "mark" | "command",
      arg?: string
    ) => AlgolBattleUI;
  };
};
