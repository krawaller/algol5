import React, { useReducer, useMemo, useState, Fragment } from "react";
import {
  AlgolBattle,
  AlgolStaticGameAPI,
  AlgolGameGraphics,
  AlgolBattleUI,
  AlgolMeta,
  AlgolDemo,
} from "../../../../types";

import { Board } from "../Board";
import { BattleControls } from "../BattleControls";
import { BattleHeadline } from "../BattleHeadline";
import { Content } from "../Content";
import { useDemo } from "../../helpers";

const noop = () => {};

type TesterProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<string, string>;
  demo: AlgolDemo;
};

type TesterState = {
  battle: AlgolBattle | null;
  frame: number;
};

type TesterAction = "mark" | "command" | "endTurn" | "undo" | "frame";
type TesterCmnd = [TesterAction, any];

export const Tester = (props: TesterProps) => {
  const { api, graphics, meta, demo } = props;
  const [{ battle: localBattle, frame }, dispatch] = useLocal(api);
  const demoData = useDemo(demo);
  const battle = localBattle!;
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
  // if we haven't finished, last frame is UI to make new move
  const frameCount = battle.history.length - (battle.gameEndedBy ? 1 : 0);
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
          frameCount={frameCount}
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
      <div style={{ padding: "10px", paddingTop: "20px", textAlign: "left" }}>
        <a href={meta.source} target="_blank">
          External rules for {meta.name}
        </a>
      </div>
    </Fragment>
  );
};

function useLocal(api: AlgolStaticGameAPI) {
  return useReducer(
    (state: TesterState, instr: TesterCmnd) => {
      const [cmnd, arg] = instr;
      if (cmnd === "frame") {
        return {
          battle: state.battle,
          frame: arg,
        };
      } else {
        const newBattle = api.performAction(state.battle!, cmnd, instr[1]);
        return {
          frame: newBattle.gameEndedBy
            ? newBattle.history.length - 1
            : cmnd === "endTurn"
            ? newBattle.history.length
            : state.frame,
          battle: newBattle,
        };
      }
    },
    {
      battle: api.newBattle(),
      frame: 1,
    }
  );
}
