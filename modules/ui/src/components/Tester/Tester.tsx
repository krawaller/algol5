import React, { useMemo, Fragment } from "react";
import {
  AlgolStaticGameAPI,
  AlgolGameGraphics,
  AlgolBattleUI,
  AlgolMeta,
  AlgolDemo,
  AlgolHydratedDemo,
} from "../../../../types";

import { Board } from "../Board";
import { BattleControls } from "../BattleControls";
import { BattleHeadline } from "../BattleHeadline";
import { Content } from "../Content";
import { GameLanding } from "../GameLanding";
import { useDemo, useBattle } from "../../helpers";
import { GameId } from "../../../../games/dist/list";
import { emptyAnim } from "../../../../common";

const noop = () => {};

type TesterProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<string, string>;
  demo: AlgolDemo;
};

export const Tester = (props: TesterProps) => {
  const { api, graphics, meta, demo } = props;
  const [{ battle, frame }, dispatch] = useBattle(api);
  const { frame: demoFrame, hydrDemo } = useDemo(demo, !battle);
  const battleUi = useMemo(
    () =>
      battle
        ? api.getBattleUI(battle)
        : hydrDemo
        ? demo2ui(hydrDemo, demoFrame)
        : emptyBattleUI,
    [battle, hydrDemo, demoFrame]
  );
  const lookback = battle && frame < battle.history.length;
  const ui: AlgolBattleUI =
    lookback && battle
      ? {
          ...battleUi,
          turnNumber: battle.history[frame].turn,
          player: battle.history[frame].player,
          board: battle.history[frame].board,
          instruction: battle.history[frame].description,
        }
      : battleUi;
  // if we haven't finished, last frame is UI to make new move
  const frameCount = battle
    ? battle.history.length - (battle.gameEndedBy ? 1 : 0)
    : 0;
  return (
    <Fragment>
      <Board
        callback={pos => dispatch(["mark", pos])}
        graphics={graphics}
        units={ui.board.units}
        marks={ui.board.marks}
        potentialMarks={ui.board.potentialMarks}
        anim={ui.board.anim}
        lookback={Boolean(lookback)}
      />
      <Fragment>
        <BattleHeadline
          currentFrame={frame}
          frameCount={frameCount}
          onChooseFrame={num => dispatch(["toFrame", num])}
          ui={ui}
          content={!battle ? { text: meta.name } : undefined}
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
          ) : battle ? (
            <BattleControls
              callback={(action, arg) => dispatch([action, arg])}
              undo={ui.undo}
              instruction={ui.instruction}
            />
          ) : (
            <GameLanding meta={meta} callback={dispatch} />
          )}
        </div>
      </Fragment>
    </Fragment>
  );
};

const emptyBattleUI: AlgolBattleUI = {
  endTurn: false,
  commands: [],
  gameId: "foo" as GameId,
  instruction: undefined,
  player: 0,
  undo: null,
  turnNumber: 1,
  board: {
    anim: emptyAnim,
    marks: [],
    potentialMarks: [],
    units: {},
  },
};

function demo2ui(demo: AlgolHydratedDemo, frame: number): AlgolBattleUI {
  return {
    ...emptyBattleUI,
    board: {
      anim: {
        ...emptyAnim,
        ...demo.anims[frame],
      },
      marks: [],
      potentialMarks: [],
      units: demo.positions[frame],
    },
  };
}
