import React, { useReducer, useMemo, useState, Fragment } from "react";
import {
  AlgolBattle,
  AlgolStaticGameAPI,
  AlgolGameGraphics,
  AlgolBattleUI,
} from "../../../types";

import { Board } from "../Board";
import { BattleControls } from "../BattleControls";
import { BattleHeadline } from "../BattleHeadline";
import { Content } from "../Content";

const noop = () => {};

type TesterProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
};

type TesterState = {
  battle: AlgolBattle;
  frame: number;
};

type TesterAction = "mark" | "command" | "endTurn" | "undo" | "frame";
type TesterCmnd = [TesterAction, any];

export const Tester = (props: TesterProps) => {
  const { api, graphics } = props;
  const [{ battle, frame }, dispatch] = useReducer(
    (state: TesterState, instr: TesterCmnd) => {
      const [cmnd, arg] = instr;
      if (cmnd === "frame") {
        return {
          battle: state.battle,
          frame: arg,
        };
      } else {
        const newBattle = api.performAction(state.battle, cmnd, instr[1]);
        return {
          frame: cmnd === "endTurn" ? newBattle.history.length : state.frame,
          battle: newBattle,
        };
      }
    },
    {
      battle: api.newBattle(),
      frame: 1,
    }
  );
  const battleUi = useMemo(() => api.getBattleUI(battle), [battle]);
  const lookback = frame < battle.history.length;
  const ui: AlgolBattleUI = !lookback
    ? battleUi
    : {
        ...battleUi,
        turnNumber: battle.history[frame].turn,
        player: battle.history[frame].player,
        board: battle.history[frame].board,
        instruction: battle.history[frame].description,
      };

  return (
    <Fragment>
      <Board
        callback={pos => dispatch(["mark", pos])}
        graphics={graphics}
        units={ui.board.units}
        marks={ui.board.marks}
        potentialMarks={ui.board.potentialMarks}
        anim={ui.board.anim}
        lookback={lookback}
      />
      <Fragment>
        <BattleHeadline
          currentFrame={frame}
          frameCount={battle.history.length}
          onChooseFrame={num => dispatch(["frame", num])}
          ui={ui}
        />
        <div style={{ padding: "10px" }}>
          {lookback ? (
            <span
              style={{
                backgroundColor: "#CCC",
                display: "inline-block",
                padding: "0 5px",
                borderRadius: "5px",
              }}
            >
              <Content content={ui.instruction} callback={noop} />
            </span>
          ) : (
            <BattleControls
              callback={(action, arg) => dispatch([action, arg])}
              undo={ui.undo}
              instruction={ui.instruction}
            />
          )}
        </div>
      </Fragment>
    </Fragment>
  );
};
