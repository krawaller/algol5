/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React from "react";

import { Page } from "../Page";
import { useUI } from "./GamePage.useUI";
import { useAppState, useGamePayload } from "../../contexts";
import { useBattleActionsAndState } from "./GamePage.useBattleActionsAndState";
import { useBattleEffects } from "./GamePage.useBattleEffects";
import { Board } from "../Board";
import { GamePageBody } from "./GamePage.Body";

export const GamePage = () => {
  // static assets for the current game
  const gamePayload = useGamePayload();
  const { api, graphics, meta, demo } = gamePayload;

  // current state of the app (URL parameters)
  const { battleMode: givenMode = "gamelobby", sessionId } = useAppState();

  // current battle state
  const [state, battleActions] = useBattleActionsAndState(api);
  const { battle, frame } = state;
  const mode = battle ? givenMode : "gamelobby";

  // current rendered board
  const ui = useUI(api, battle, frame, demo, givenMode);

  // battle-related side effects
  useBattleEffects({
    api,
    actions: battleActions,
    state,
    meta,
    mode,
    sessionId,
    ui,
  });

  return (
    <Page
      title={gamePayload.meta.name}
      top={
        <Board
          callback={battleActions.mark}
          graphics={graphics}
          units={ui.board.units}
          marks={ui.board.marks}
          potentialMarks={ui.board.potentialMarks}
          anim={ui.board.anim}
          active={mode === "playing" && !battle!.gameEndedBy}
          name={mode !== "gamelobby" ? battle!.variant.board : "basic"}
        />
      }
      body={
        <GamePageBody
          ui={ui}
          mode={mode}
          battleActions={battleActions}
          battleState={state}
          gamePayload={gamePayload}
        />
      }
    />
  );
};
