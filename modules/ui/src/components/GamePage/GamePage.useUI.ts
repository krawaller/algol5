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
  mode: "gamelobby" | "battlelobby" | "playing" | "history" | "battlehelp"
): AlgolBattleUI => {
  const { frame: demoFrame, hydrDemo } = useDemo({
    demo,
    playing: mode === "gamelobby",
    restart: true,
  });
  return useMemo(() => {
    if (mode === "gamelobby") {
      return hydrDemo ? demo2ui(hydrDemo, demoFrame) : emptyBattleUI;
    } else if (battle) {
      // if statement is mostly for TS inference, battle should always be defined here
      const battleUi = api.getBattleUI(battle);
      if (mode === "playing") {
        return battleUi;
      }
      if (mode === "history") {
        return {
          ...battleUi,
          turnNumber: battle!.history[battleFrame].turn,
          player: battle!.history[battleFrame].player,
          board: battle!.history[battleFrame].board,
          instruction: battle!.history[battleFrame].description,
        };
      }
      return {
        ...battleUi,
        board: {
          ...battleUi.board,
          potentialMarks: [],
          marks: battle.gameEndedBy ? battleUi.board.marks : [],
        },
      };
    }
    return emptyBattleUI;
  }, [battle, hydrDemo, demoFrame, battleFrame, mode]);
};
