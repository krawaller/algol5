/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { useMemo, ReactNode, useState } from "react";
import {
  AlgolStaticGameAPI,
  AlgolGameGraphics,
  AlgolMeta,
  AlgolDemo,
  AlgolError,
  AlgolErrorReport,
  AlgolErrorReportLevel,
  AlgolGameBlobAnon,
} from "../../../../types";

import { Board } from "../Board";
import { Page } from "../Page";
import { BattleControls } from "../BattleControls";
import { BattleLanding } from "../BattleLanding";
import { GameLanding } from "../GameLanding";
import { BattleHistory } from "../BattleHistory";
import { PageActions } from "../../helpers";
import { useUI } from "./GamePage.useUI";
import { useBattle } from "./GamePage.useBattle";
import { Breadcrumbs, Crumb } from "../Breadcrumbs";
import { BattleHelp } from "../BattleHelp";
import { SessionViewSelector } from "../SessionViewSelector";

type GamePageHTML = {
  about: {
    html: string;
    updated: string;
  };
  rules: {
    html: string;
    updated: string;
  };
};

type GamePageProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  demo: AlgolDemo;
  actions: PageActions;
  content: GamePageHTML;
};

export const GamePage = (props: GamePageProps) => {
  const { api, graphics, meta, demo, actions: pageActions, content } = props;
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
  const frameCount = battle ? battle.history.length - 1 : 0;

  const crumbs: Crumb[] = [
    {
      content: meta.name,
      onClick: mode !== "gamelobby" ? actions.toGameLobby : undefined,
    },
  ];
  if (mode !== "gamelobby") {
    crumbs.push({
      content: "",
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
    body = <BattleControls actions={actions} ui={ui} />;
  } else if (mode === "battlehelp") {
    // watching help page for ongoing battle
    body = (
      <BattleHelp
        actions={actions}
        instruction={ui.instruction}
        content={content}
      />
    );
  } else {
    // No battle active, we're just at the game landing page
    body = (
      <GameLanding
        meta={meta}
        actions={actions}
        graphics={graphics}
        hasPrevious={hasPrevious}
        content={content}
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
        <Board
          callback={actions.mark}
          graphics={graphics}
          units={ui.board.units}
          marks={ui.board.marks}
          potentialMarks={ui.board.potentialMarks}
          anim={ui.board.anim}
          active={mode === "playing" && !battle!.gameEndedBy}
        />
      }
      strip={
        <>
          <Breadcrumbs crumbs={crumbs} actions={actions} />
          {viewSelector}
        </>
      }
      body={body}
    />
  );
};
