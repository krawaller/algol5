import React, { useMemo, useState, useCallback } from "react";
import { AlgolGame, AlgolBattle } from "../../../types";

import { Board } from "../Board";
import { BattleUI } from "../BattleUI";

import dataURIs from "../../../graphics/dist/svgDataURIs";

import { getBattleUI } from "../../../battle/src/battle";
import { GameId } from "../../../battle/commands/helpers/_names";
import { makeStaticGameAPI } from "../../../battle/src";

type TesterProps = {
  game: AlgolGame;
};

export const Tester = (props: TesterProps) => {
  const { game } = props;
  const api = useMemo(() => makeStaticGameAPI(game), [game]);
  const gameId = game.gameId as GameId;
  const [battle, updateBattle] = useState<AlgolBattle>(api.newBattle());
  const move = useCallback(
    (
      action: "mark" | "command" | "endTurn" | "undo",
      arg: string | undefined
    ) => {
      updateBattle(api.performAction(battle, action, arg));
    },
    [api, battle]
  );
  const ui = getBattleUI(game, battle);
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
