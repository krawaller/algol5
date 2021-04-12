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
};

export const fakeBattleNavActions: BattleNavActions = {
  toHistory: () => console.log("to history"),
  toGameLobby: () => console.log("to game lobby"),
  toBattleLobby: () => console.log("to battle lobby"),
  toBattleControls: () => console.log("to battle controls"),
  toSession: (id, mode) => console.log("to session", id, mode),
};

export const BattleNavContext = createContext(fakeBattleNavActions);

export const useBattleNav = () => {
  return useContext(BattleNavContext);
};
