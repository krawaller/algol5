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
import { Content } from "../Content";

type GamePageProps = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<string, string>;
  demo: AlgolDemo;
  actions: PageActions;
};

export const GamePage = (props: GamePageProps) => {
  const { api, graphics, meta, demo, actions: pageActions } = props;
  const [
    { battle, frame, mode, session, hasPrevious },
    battleActions,
  ] = useBattle(api);
  const [error, setError] = useState<AlgolError>();
  const actions = useMemo(
    () => ({ ...pageActions, ...battleActions, error: setError }),
    [pageActions, battleActions]
  );
  const ui = useUI(api, battle, frame, demo, mode);
  const frameCount = battle ? battle.history.length - 1 : 0;

  let crumbs: Crumb[];
  let body: ReactNode;
  if (mode === "history") {
    // We are currently watching the history of a battle
    crumbs = [
      { content: meta.name, onClick: actions.toGameLobby },
      { content: "session", onClick: actions.toBattleLobby },
      { content: "history" },
    ];
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
    crumbs = [
      { content: meta.name, onClick: actions.toGameLobby },
      { content: "session" },
    ];
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
    crumbs = [
      { content: meta.name, onClick: actions.toGameLobby },
      { content: "session", onClick: actions.toBattleLobby },
      {
        content: (
          <Content
            content={{
              line: [
                { text: `turn ${battle!.turnNumber}, ` },
                { player: battle!.player },
              ],
            }}
          />
        ),
      },
    ];
    body = (
      <BattleControls actions={actions} ui={ui} haveHistory={frameCount > 1} />
    );
  } else {
    // No battle active, we're just at the game landing page
    crumbs = [{ content: meta.name }];
    body = (
      <GameLanding
        meta={meta}
        actions={actions}
        graphics={graphics}
        hasPrevious={hasPrevious}
      />
    );
  }

  return (
    <Page
      error={error}
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
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={body}
    />
  );
};
