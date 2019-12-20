import React, { useReducer } from "react";
import {
  AlgolBattle,
  AlgolStaticGameAPI,
  AlgolGameGraphics,
} from "../../../types";

import { Board } from "../Board";
import { BattleUI } from "../BattleUI";

type TesterProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
};

export const Tester = (props: TesterProps) => {
  const { api, graphics } = props;
  const [battle, dispatch] = useReducer(
    (b: AlgolBattle, instr: ["mark" | "command" | "endTurn" | "undo", any]) =>
      api.performAction(b, instr[0], instr[1]),
    api.newBattle()
  );

  const ui = api.getBattleUI(battle);
  return (
    <React.Fragment>
      <Board
        callback={pos => dispatch(["mark", pos])}
        board={graphics}
        units={ui.board.units}
        marks={ui.board.marks}
        potentialMarks={ui.board.potentialMarks}
        anim={ui.board.anim}
      />
      <BattleUI callback={(action, arg) => dispatch([action, arg])} ui={ui} />
    </React.Fragment>
  );
};
