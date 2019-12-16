import React, { useMemo, useState, useEffect } from "react";
import { AlgolBattleUI, AlgolGame } from "../../../types";

import { Board } from "../Board";
import { BattleUI } from "../BattleUI";

import dataURIs from "../../../graphics/dist/svgDataURIs";

import { makeStore } from "../../../redux/store";
import {
  performMove,
  sideloadGame,
  selectCurrentBattleInfo,
} from "../../../redux/slices";
import { getBattleUI } from "../../../battle/src/battle";
import { GameId } from "../../../battle/commands/helpers/_names";

type TesterProps = {
  game: AlgolGame;
};

export const Tester = (props: TesterProps) => {
  const { game } = props;
  const gameId = game.gameId as GameId;
  const [ui, updateUI] = useState<AlgolBattleUI | null>(null);
  const move = useMemo(() => {
    const store = makeStore();
    store.subscribe(() => {
      const battleState = selectCurrentBattleInfo(store.getState(), gameId)!;
      if (battleState) {
        const newUI = getBattleUI(game, battleState.battle);
        updateUI(newUI);
      }
    });
    store.dispatch(sideloadGame({ gameId, game, startNewBattle: true }));
    return (
      action: "mark" | "command" | "endTurn" | "undo",
      arg: string | undefined
    ) => {
      const battleId = store.getState().games[gameId].currentBattleId!;
      store.dispatch(performMove({ action, arg, battleId }));
    };
  }, [gameId]);
  if (!ui) return null;
  return (
    <React.Fragment>
      <Board
        callback={pos => move("mark", pos)}
        board={dataURIs[gameId]}
        units={ui.board.units}
        marks={ui.board.marks}
        potentialMarks={ui.board.potentialMarks}
        anim={ui.board.anim}
      />
      <BattleUI callback={move} ui={ui} />
    </React.Fragment>
  );
};
