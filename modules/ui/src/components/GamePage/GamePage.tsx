/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { useMemo, Fragment } from "react";
import {
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
import { GameLanding } from "../GameLanding";
import { useDemo, useBattle, PageActions } from "../../helpers";
import { demo2ui, emptyBattleUI } from "../../../../common";

type GamePageProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<string, string>;
  demo: AlgolDemo;
  actions: PageActions;
};

export const GamePage = (props: GamePageProps) => {
  const { api, graphics, meta, demo } = props;
  const [{ battle, frame }, actions] = useBattle(api);
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
        callback={actions.mark}
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
          onChooseFrame={actions.toFrame}
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
              <Content content={ui.instruction} />
            </span>
          ) : battle ? (
            <BattleControls
              actions={actions}
              undo={ui.undo}
              instruction={ui.instruction}
            />
          ) : (
            <GameLanding meta={meta} actions={actions} graphics={graphics} />
          )}
        </div>
      </Fragment>
    </Fragment>
  );
};
