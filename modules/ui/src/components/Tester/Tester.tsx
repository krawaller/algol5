import React, { useReducer, useMemo, Fragment } from "react";
import {
  AlgolBattle,
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
import { useDemo } from "../../helpers";
import { GameId } from "../../../../games/dist/list";
import { emptyAnim } from "../../../../common";

import styles from "./Tester.cssProxy";

const noop = () => {};

type TesterProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<string, string>;
  demo: AlgolDemo;
};

export const Tester = (props: TesterProps) => {
  const { api, graphics, meta, demo } = props;
  const [{ battle, frame }, dispatch] = useLocal(api);
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
            <div className={styles.gameLanding}>
              <button
                className={styles.gameButtonLink}
                onClick={() => dispatch(["new", null])}
              >
                Start a local game
              </button>
              <a
                href={meta.source}
                target="_blank"
                className={styles.gameButtonLink}
              >
                Go to rules (external)
              </a>
            </div>
          )}
        </div>
      </Fragment>
    </Fragment>
  );
};

type LocalBattleAction =
  | "mark"
  | "command"
  | "endTurn"
  | "undo"
  | "toFrame"
  | "new";
type LocalBattleCmnd = [LocalBattleAction, any];

type LocalBattleState = {
  battle: AlgolBattle | null;
  frame: number;
};

function useLocal(api: AlgolStaticGameAPI) {
  return useReducer(
    (state: LocalBattleState, instr: LocalBattleCmnd) => {
      const [cmnd, arg] = instr;
      if (cmnd === "toFrame") {
        return {
          battle: state.battle,
          frame: arg,
        };
      } else if (cmnd === "new") {
        return {
          battle: api.newBattle(),
          frame: 1,
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
      battle: null,
      frame: 0,
    }
  );
}

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
