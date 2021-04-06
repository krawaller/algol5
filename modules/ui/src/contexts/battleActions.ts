import { createContext, useContext } from "react";
import { BattleMode } from "./appState";

export type BattleNavActions = {
  toHistory: () => void;
  toGameLobby: () => void;
  toBattleLobby: () => void;
  toBattleControls: () => void;
  toSession: (
    sessionId: string,
    mode?: BattleMode | undefined,
    replace?: boolean
  ) => void;
  newLocalBattle: (code: string, mode?: BattleMode | undefined) => void;
};

export const fakeBattleNavActions: BattleNavActions = {
  toHistory: () => console.log("to history"),
  toGameLobby: () => console.log("to game lobby"),
  toBattleLobby: () => console.log("to battle lobby"),
  toBattleControls: () => console.log("to battle controls"),
  toSession: (id, mode) => console.log("to session", id, mode),
  newLocalBattle: (code, mode) => console.log("new local battle", code, mode),
};

export const BattleNavContext = createContext(fakeBattleNavActions);

export const useBattleNav = () => {
  return useContext(BattleNavContext);
};
