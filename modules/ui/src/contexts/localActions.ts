import { createContext, useContext } from "react";
import { AlgolBattle } from "../../../types";

export type LocalBattleActions = {
  newLocalBattle: (code: string) => void;
  deleteSession: (sessionId: string, retreatToGameLobby: boolean) => void;
  loadLocalSession: (sessionId: string) => void;
  forkBattleFrame: (battle: AlgolBattle, frame: number) => void;
  importSession: (str: string) => void;
};

export const fakeLocalBattleActions: LocalBattleActions = {
  newLocalBattle: code => {
    console.log("Started new local battle with code", code);
  },
  deleteSession: (sessionId, retreatToGameLobby) => {
    console.log("Deleting", { sessionId, retreatToGameLobby });
  },
  loadLocalSession: sessionId => {
    console.log("loading", sessionId);
  },
  forkBattleFrame: (battle, frame) => {
    console.log("forking", { battle, frame });
  },
  importSession: str => {
    console.log("import session from string", str);
  },
};

export const LocalBattleActionContext = createContext(fakeLocalBattleActions);

export const useLocalBattleActions = () => {
  return useContext(LocalBattleActionContext);
};
