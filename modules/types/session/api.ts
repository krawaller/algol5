import { AlgolBattleUI } from "./ui";
import { AlgolBattle, AlgolHistoryMove } from "./battle";
import { GameId } from "../../games/dist/list";
import { AlgolBattleSave } from "./save";
import { AlgolIconMap } from "..";
import { AlgolVariantAnon } from "../gamedef";

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
  variants: AlgolVariantAnon[];
  iconMap: AlgolIconMap;
};

export type AlgolStaticGameAPI = {
  gameId: GameId;
  newBattle: () => AlgolBattle;
  fromSave: (save: AlgolBattleSave) => AlgolBattle;
  fromFrame: (frame: AlgolHistoryMove) => AlgolBattle;
  performAction: (
    battle: AlgolBattle,
    action: "endTurn" | "undo" | "mark" | "command",
    arg?: string
  ) => AlgolBattle;
  getBattleUI: (battle: AlgolBattle) => AlgolBattleUI;
  iconMap: AlgolIconMap;
  variants: AlgolVariantAnon[];
};
