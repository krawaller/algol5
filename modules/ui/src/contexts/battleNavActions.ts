import { createContext, useContext } from "react";
import { BattleMode } from "./appState";

export type BattleNavActions = {
  toHistory: () => void;
  toGameLobby: () => void;
  toBattleLobby: () => void;
  toBattleControls: () => void;
  toNewLocalBattle: (code: string, mode?: BattleMode, slug?: string) => void;
  toSession: (
    sessionId: string,
    mode?: BattleMode | undefined,
    replace?: boolean
  ) => void;
};

export const fakeBattleNavActions: BattleNavActions = {
  toHistory: () => console.log("to history"),
  toGameLobby: () => console.log("to game lobby"),
  toBattleLobby: () => console.log("to battle lobby"),
  toBattleControls: () => console.log("to battle controls"),
  toNewLocalBattle: (code, mode, slug) =>
    console.log("to new local battle", { code, mode, slug }),
  toSession: (id, mode) => console.log("to session", { id, mode }),
};

export const BattleNavContext = createContext(fakeBattleNavActions);

export const useBattleNav = () => {
  return useContext(BattleNavContext);
};
