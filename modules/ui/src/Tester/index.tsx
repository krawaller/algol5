import React, { useMemo, useState } from "react";
import { AlgolBattleUI, AlgolGame } from "../../../types";

import { Board } from "../Board";
import { BattleUI } from "../BattleUI";

import dataURIs from "../../../graphics/dist/svgDataURIs";

import { makeStore } from "../../../redux/store";
import { makeMakeMove, makeStartBattle } from "../../../redux/slices";
import { getBattleUI } from "../../../battle/src/battle";
import { GameId } from "../../../battle/commands/helpers/_names";

type TesterProps = {
  game: AlgolGame;
};

export const Tester = (props: TesterProps) => {
  const { game } = props;
  const [ui, updateUI] = useState<AlgolBattleUI | null>(null);
  const move = useMemo(() => {
    const startBattle = makeStartBattle(game);
    const makeMove = makeMakeMove(game);
    const store = makeStore();
    store.subscribe(() => {
      const state = store.getState().battle.games[game.gameId as GameId]!;
      const battleId = state.currentBattleId!;
      const newUI = getBattleUI(game, state.battles[battleId].battle);
      updateUI(newUI);
    });
    store.dispatch(startBattle());
    return (
      action: "mark" | "command" | "endTurn" | "undo",
      arg: string | undefined
    ) => {
      store.dispatch(makeMove(action, arg));
    };
  }, [game.gameId]);
  if (!ui) return null;
  return (
    <React.Fragment>
      <Board
        callback={pos => move("mark", pos)}
        board={dataURIs[game.gameId as keyof typeof dataURIs]}
        units={ui.board.units}
        marks={ui.board.marks}
        potentialMarks={ui.board.potentialMarks}
        anim={ui.board.anim}
      />
      <BattleUI callback={move} ui={ui} />
    </React.Fragment>
  );
};
