import { AlgolBattleUI } from "./ui";

export type AlgolGameAPI = {
  newBattle: () => {
    initialUI: AlgolBattleUI;
    performAction: (action: string) => AlgolBattleUI;
  };
};
