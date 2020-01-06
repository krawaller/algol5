import {
  AlgolBattle,
  AlgolStaticGameAPI,
  AlgolBattleUI,
  AlgolDemo,
} from "../../../../types";
import { useMemo } from "react";
import { demo2ui, emptyBattleUI } from "../../../../common";
import { useDemo } from "../../helpers";

export const useUI = (
  api: AlgolStaticGameAPI,
  battle: AlgolBattle | null,
  battleFrame: number,
  demo: AlgolDemo,
  mode: "gamelobby" | "battlelobby" | "playing" | "history"
): AlgolBattleUI => {
  const inGameLobby = mode === "gamelobby";
  const inHistory = mode === "history";
  const { frame: demoFrame, hydrDemo } = useDemo(demo, inGameLobby);
  return useMemo(() => {
    if (inGameLobby) {
      return hydrDemo ? demo2ui(hydrDemo, demoFrame) : emptyBattleUI;
    } else if (battle) {
      // if statement is mostly for TS inference, battle should always be defined here
      const battleUi = api.getBattleUI(battle);
      return inHistory
        ? {
            ...battleUi,
            turnNumber: battle!.history[battleFrame].turn,
            player: battle!.history[battleFrame].player,
            board: battle!.history[battleFrame].board,
            instruction: battle!.history[battleFrame].description,
          }
        : battleUi;
    }
    return emptyBattleUI;
  }, [battle, hydrDemo, demoFrame, battleFrame, inGameLobby, inHistory]);
};
