/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { ReactNode, useState, useEffect } from "react";
import {
  AlgolErrorReport,
  AlgolGamePayload,
  AppActions,
  BattleNavActions,
} from "../../../../types";
import css from "./GamePage.cssProxy";

import { Board } from "../Board";
import { Page } from "../Page";
import { BattleLanding } from "../BattleLanding";
import { GameLanding } from "../GameLanding";
import { BattleHistory } from "../BattleHistory";
import { useUI } from "./GamePage.useUI";
import { useBattle } from "./GamePage.useBattle";
import { useActions } from "./GamePage.useActions";
import { SessionViewSelector } from "../SessionViewSelector";
import { BattleMove } from "../BattleMove";
import { getLatestSessionId } from "../../../../local/src";
import { BattleMode } from "../../../../types/page/battleActions";
import { makeSessionNav } from "../../../../common/nav/makeSessionNav";
import { makeGameNav } from "../../../../common/nav/makeGameNav";

type GamePageProps = {
  actions: AppActions & BattleNavActions;
  gamePayload: AlgolGamePayload;
  ctxt: { sessionId?: string | null; mode?: BattleMode };
};

export const GamePage = (props: GamePageProps) => {
  const { actions: pageActions, gamePayload, ctxt } = props;
  const { mode: givenMode = "gamelobby", sessionId } = ctxt;
  const { api, graphics, meta, demo, rules } = gamePayload;
  const [{ battle, frame, session }, battleActions] = useBattle(
    api,
    sessionId as string,
    pageActions.toSession
  );
  const [errorReport, setErrorReport] = useState<AlgolErrorReport>();
  const actions = useActions({
    pageActions,
    battleActions,
    setErrorReport,
    api,
  });
  const ui = useUI(api, battle, frame, demo, givenMode);
  const mode = battle ? givenMode : "gamelobby";

  useEffect(
    () =>
      actions.setNav(
        mode === "gamelobby"
          ? makeGameNav(gamePayload.meta)
          : makeSessionNav({
              mode,
              session: session!,
              battleNavActions: actions,
              meta: gamePayload.meta,
            })
      ),
    [mode, actions.setNav]
  );

  // TODO - maybe not read this on every render? move to state somewhere?
  const previousSessionId = getLatestSessionId(api.gameId);

  let body: ReactNode;
  if (mode === "history") {
    // We are currently watching the history of a battle
    body = (
      <BattleHistory
        actions={actions}
        content={ui.instruction}
        frame={Math.max(0, frame)}
        battle={battle!}
      />
    );
  } else if (mode === "battlelobby") {
    // we are on the landing page for a created/loaded session
    body = (
      <BattleLanding
        battle={battle!}
        actions={actions}
        session={session!}
        meta={meta}
      />
    );
  } else if (mode === "playing") {
    // We are actively playing an ongoing battle
    body = <BattleMove actions={actions} ui={ui} rules={rules} />;
  } else {
    // No battle active, we're just at the game landing page
    body = (
      <GameLanding
        meta={meta}
        actions={actions}
        graphics={graphics}
        previousSessionId={previousSessionId}
        variants={api.variants}
      />
    );
  }

  let viewSelector = mode !== "gamelobby" && (
    <SessionViewSelector mode={mode} actions={actions} />
  );

  return (
    <Page
      errorReport={errorReport}
      top={
        <>
          <Board
            callback={actions.mark}
            graphics={graphics}
            units={ui.board.units}
            marks={ui.board.marks}
            potentialMarks={ui.board.potentialMarks}
            anim={ui.board.anim}
            active={mode === "playing" && !battle!.gameEndedBy}
            name={mode !== "gamelobby" ? battle!.variant.board : "basic"}
          />{" "}
          <div className={css.gamePageViewSelectorContainer}>
            {viewSelector}
          </div>
        </>
      }
      body={body}
    />
  );
};
