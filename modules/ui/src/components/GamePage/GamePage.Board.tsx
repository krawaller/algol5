import React from "react";
import { BattleMode } from "../../contexts";
import { Board } from "../Board";
import { AlgolBattleUI, AlgolGameGraphics } from "../../../../types";
import { BattleHookState } from "./GamePage.useBattleActionsAndState";
import { isWaitingForRemote } from "../../../../common";

type GamePageBoardProps = {
  ui: AlgolBattleUI;
  mode: BattleMode;
  battleState?: BattleHookState | null;
  graphics: AlgolGameGraphics;
  mark: (pos: string) => void;
};

export const GamePageBoard = (props: GamePageBoardProps) => {
  const { ui, mode, graphics, mark, battleState } = props;
  const { battle, session } = battleState ?? ({} as BattleHookState);
  const active =
    mode === "playing" && !battle!.gameEndedBy && !isWaitingForRemote(session);
  return (
    <Board
      callback={mark}
      graphics={graphics}
      units={ui.board.units}
      marks={ui.board.marks}
      potentialMarks={ui.board.potentialMarks}
      anim={ui.board.anim}
      active={active}
      name={mode !== "gamelobby" ? battle!.variant.board : "basic"}
    />
  );
};
