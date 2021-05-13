/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { ReactNode } from "react";

import { Board } from "../Board";
import { Page } from "../Page";
import { BattleLanding } from "../BattleLanding";
import { GameLanding } from "../GameLanding";
import { BattleHistory } from "../BattleHistory";
import { useUI } from "./GamePage.useUI";
import { BattleMove } from "../BattleMove";
import { getLatestSessionIdForGame } from "../../../../local/expose";
import { useAppState, useGamePayload } from "../../contexts";
import { useBattleActionsAndState } from "./GamePage.useBattleActionsAndState";
import { useBattleEffects } from "./GamePage.useBattleEffects";

export const GamePage = () => {
  const gamePayload = useGamePayload();
  const { battleMode: givenMode = "gamelobby", sessionId } = useAppState();
  const { api, graphics, meta, demo, rules } = gamePayload;
  const [state, battleActions] = useBattleActionsAndState(api);
  const { battle, frame, session } = state;
  const ui = useUI(api, battle, frame, demo, givenMode);
  const mode = battle ? givenMode : "gamelobby";
  useBattleEffects({
    api,
    actions: battleActions,
    state,
    meta,
    mode,
    sessionId,
    ui,
  });

  // TODO - maybe not read this on every render? move to state somewhere?
  const previousSessionId = getLatestSessionIdForGame(api.gameId);

  let body: ReactNode;
  if (mode === "history") {
    // We are currently watching the history of a battle
    body = (
      <BattleHistory
        content={ui.instruction}
        frame={Math.max(0, frame)}
        toFrame={battleActions.toFrame}
        battle={battle!}
      />
    );
  } else if (mode === "battlelobby") {
    // we are on the landing page for a created/loaded session
    body = (
      <BattleLanding
        battle={battle!}
        session={session!}
        meta={meta}
        manyVariants={api.variants.length > 1}
      />
    );
  } else if (mode === "playing") {
    // We are actively playing an ongoing battle
    body = <BattleMove actions={battleActions} ui={ui} rules={rules} />;
  } else {
    // No battle active, we're just at the game landing page
    body = (
      <GameLanding
        meta={meta}
        graphics={graphics}
        previousSessionId={previousSessionId}
        variants={api.variants}
      />
    );
  }

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
      body={body}
    />
  );
};
