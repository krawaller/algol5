import { AlgolBattleUI } from "./ui";
import { AlgolBattle } from "./battle";
import { GameId } from "../../games/dist/list";
import { AlgolBattleSave } from "./save";

export type AlgolStatefulGameAPI = {
  gameId: GameId;
  newBattle: () => AlgolStatefulGameAPISession;
  fromSave: (save: AlgolBattleSave) => AlgolStatefulGameAPISession;
};

export type AlgolStatefulGameAPISession = {
  initialUI: AlgolBattleUI;
  performAction: (
    action: "endTurn" | "undo" | "mark" | "command",
    arg?: string
  ) => AlgolBattleUI;
};

export type AlgolStaticGameAPI = {
  gameId: GameId;
  newBattle: () => AlgolBattle;
  fromSave: (save: AlgolBattleSave) => AlgolBattle;
  performAction: (
    battle: AlgolBattle,
    action: "endTurn" | "undo" | "mark" | "command",
    arg?: string
  ) => AlgolBattle;
  getBattleUI: (battle: AlgolBattle) => AlgolBattleUI;
};
