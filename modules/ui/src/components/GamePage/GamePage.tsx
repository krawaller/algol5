/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React from "react";

import { Page } from "../Page";
import { useUI } from "./GamePage.useUI";
import { useAppState, useGamePayload } from "../../contexts";
import { useBattleActionsAndState } from "./GamePage.useBattleActionsAndState";
import { useBattleEffects } from "./GamePage.useBattleEffects";
import { GamePageBody } from "./GamePage.Body";
import { GamePageBoard } from "./GamePage.Board";

export const GamePage = () => {
  // static assets for the current game
  const gamePayload = useGamePayload();
  const { api, graphics, meta, demo } = gamePayload;

  // current state of the app (URL parameters)
  const { battleMode: givenMode = "gamelobby", sessionId } = useAppState();

  // current battle state
  const [state, battleActions] = useBattleActionsAndState(api);
  const { battle } = state;
  const mode = battle ? givenMode : "gamelobby";

  // current rendered board (will be for demo while no active battle)
  const ui = useUI({ api, state, demo, mode: givenMode });

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
      title={meta.name}
      top={
        <GamePageBoard
          ui={ui}
          mode={mode}
          graphics={graphics}
          battleState={state}
          mark={battleActions.mark}
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
