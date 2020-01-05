/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { Fragment, useMemo } from "react";
import {
  AlgolStaticGameAPI,
  AlgolGameGraphics,
  AlgolMeta,
  AlgolDemo,
} from "../../../../types";

import { Board } from "../Board";
import { BattleControls } from "../BattleControls";
import { GameLanding } from "../GameLanding";
import { BattleHistory } from "../BattleHistory";
import { useBattle, PageActions } from "../../helpers";
import { useUI } from "./GamePage.useUI";

type GamePageProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<string, string>;
  demo: AlgolDemo;
  actions: PageActions;
};

export const GamePage = (props: GamePageProps) => {
  const { api, graphics, meta, demo, actions: pageActions } = props;
  const [{ battle, frame }, battleActions] = useBattle(api);
  const actions = useMemo(() => ({ ...pageActions, ...battleActions }), [
    pageActions,
    battleActions,
  ]);
  const ui = useUI(api, battle, frame, demo);
  const lookback = battle && frame > -1;
  const frameCount = battle ? battle.history.length - 1 : 0;
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
      {lookback ? (
        <BattleHistory
          actions={actions}
          content={ui.instruction}
          frame={Math.max(0, frame)}
          frameCount={frameCount}
          battleFinished={Boolean(battle!.gameEndedBy)}
          meta={meta}
        />
      ) : battle ? (
        <BattleControls
          actions={actions}
          undo={ui.undo}
          instruction={ui.instruction}
          turnNumber={battle.turnNumber}
          player={battle.player}
          haveHistory={frameCount > 1}
          meta={meta}
        />
      ) : (
        <GameLanding meta={meta} actions={actions} graphics={graphics} />
      )}
    </Fragment>
  );
};
