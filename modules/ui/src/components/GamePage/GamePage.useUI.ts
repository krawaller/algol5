import {
  AlgolStaticGameAPI,
  AlgolBattleUI,
  AlgolDemo,
} from "../../../../types";
import { useMemo, useRef } from "react";
import { demo2ui, emptyBattleUI, emptyAnim } from "../../../../common";
import { useDemo } from "../../helpers";
import { BattleMode } from "../../contexts";
import { BattleHookState } from "./GamePage.useBattleActionsAndState";

type UseUIOpts = {
  api: AlgolStaticGameAPI;
  demo: AlgolDemo;
  mode: BattleMode;
  state: BattleHookState;
};

export const useUI = (opts: UseUIOpts): AlgolBattleUI => {
  const { demo, mode, api, state } = opts;
  const { frame: battleFrame, loading, battle } = state;
  const demoPlaying =
    mode === "gamelobby" ||
    (mode === "battlelobby" && !battle) ||
    loading === "session";
  const { frame: demoFrame, hydrDemo } = useDemo({
    demo,
    playing: demoPlaying,
    restart: true,
    gameId: api.gameId,
  });
  const prevBattleFrame = useRef(0);
  return useMemo(() => {
    if (demoPlaying) {
      return hydrDemo ? demo2ui(hydrDemo, demoFrame) : emptyBattleUI;
    } else if (battle) {
      // if statement is mostly for TS inference, battle should always be defined here
      const battleUi = api.getBattleUI(battle);
      if (mode === "playing") {
        return battleUi;
      }
      if (mode === "history") {
        const historyUI = {
          ...battleUi,
          turnNumber: battle!.history[battleFrame].turn,
          player: battle!.history[battleFrame].player,
          board: battle!.history[battleFrame].board,
          instruction: battle!.history[battleFrame].description,
        };
        if (prevBattleFrame.current !== battleFrame) {
          if (prevBattleFrame.current !== battleFrame - 1) {
            historyUI.board = {
              ...historyUI.board,
              anim: emptyAnim,
            };
          }
          prevBattleFrame.current = battleFrame;
        }
        return historyUI;
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
