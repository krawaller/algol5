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
  const demoPlaying = mode === "gamelobby" || loading === "session";
  const { frame: demoFrame, hydrDemo } = useDemo({
    demo,
    playing: demoPlaying,
    restart: true,
    gameId: api.gameId,
  });
  const prevBattleFrame = useRef(0);
  return useMemo(() => {
    // if no active battle we show demo
    if (demoPlaying) {
      return hydrDemo ? demo2ui(hydrDemo, demoFrame) : emptyBattleUI;
    }

    // In first render of battlelobby we don't have battle and we are not loading yet
    if (!battle) {
      return emptyBattleUI;
    }

    const battleUi = api.getBattleUI(battle);

    // While making moves we show current state
    if (mode === "playing") {
      return battleUi;
    }

    // In the battlelobby we don't show selections, but we do show game end highlights
    if (mode === "battlelobby") {
      return {
        ...battleUi,
        board: {
          ...battleUi.board,
          potentialMarks: [],
          marks: battle.gameEndedBy ? battleUi.board.marks : [],
        },
      };
    }

    // In history we show the chosen frame
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

    throw new Error(
      `Unknown UI request! Mode: "${mode}", has battle: "${Boolean(battle)}"`
    );
  }, [battle, hydrDemo, demoFrame, battleFrame, mode]);
};
