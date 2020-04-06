/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { useMemo, ReactNode, useState } from "react";
import {
  AlgolError,
  AlgolErrorReport,
  AlgolErrorReportLevel,
  AlgolGamePayload,
} from "../../../../types";
import css from "./GamePage.cssProxy";

import { Board } from "../Board";
import { Page } from "../Page";
import { BattleLanding } from "../BattleLanding";
import { GameLanding } from "../GameLanding";
import { BattleHistory } from "../BattleHistory";
import { PageActions } from "../../helpers";
import { useUI } from "./GamePage.useUI";
import { useBattle } from "./GamePage.useBattle";
import { Breadcrumbs, Crumb } from "../Breadcrumbs";
import { SessionViewSelector } from "../SessionViewSelector";
import { BattleMove } from "../BattleMove";

type GamePageProps = {
  actions: PageActions;
  gamePayload: AlgolGamePayload;
};

export const GamePage = (props: GamePageProps) => {
  const { actions: pageActions, gamePayload } = props;
  const { api, graphics, meta, demo, rules } = gamePayload;
  const [
    { battle, frame, mode, session, hasPrevious },
    battleActions,
  ] = useBattle(api);
  const [errorReport, setErrorReport] = useState<AlgolErrorReport>();
  const actions = useMemo(
    () => ({
      ...pageActions,
      ...battleActions,
      reportError: (
        error: AlgolError,
        level: AlgolErrorReportLevel = "warning"
      ) => setErrorReport({ error, level }),
    }),
    [pageActions, battleActions]
  );
  const ui = useUI(api, battle, frame, demo, mode);

  const crumbs: Crumb[] = [
    {
      content: "Games",
      url: "/games",
    },
    {
      content: meta.name,
      onClick: mode !== "gamelobby" ? actions.toGameLobby : undefined,
    },
  ];
  if (mode !== "gamelobby") {
    crumbs.push({
      content: session!.id,
    });
  }
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
        hasPrevious={hasPrevious}
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
      strip={
        <>
          <Breadcrumbs crumbs={crumbs} actions={actions} />
        </>
      }
      body={body}
    />
  );
};
