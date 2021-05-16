import React from "react";
import { BattleMode } from "../../contexts";
import { Board } from "../Board";
import {
  AlgolBattle,
  AlgolBattleUI,
  AlgolGameGraphics,
} from "../../../../types";

type GamePageBoardProps = {
  ui: AlgolBattleUI;
  mode: BattleMode;
  battle?: AlgolBattle | null;
  graphics: AlgolGameGraphics;
  mark: (pos: string) => void;
};

export const GamePageBoard = (props: GamePageBoardProps) => {
  const { ui, mode, battle, graphics, mark } = props;
  return (
    <Board
      callback={mark}
      graphics={graphics}
      units={ui.board.units}
      marks={ui.board.marks}
      potentialMarks={ui.board.potentialMarks}
      anim={ui.board.anim}
      active={mode === "playing" && !battle!.gameEndedBy}
      name={mode !== "gamelobby" ? battle!.variant.board : "basic"}
    />
  );
};
