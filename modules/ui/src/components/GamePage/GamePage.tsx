/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { Fragment, useMemo, ReactNode } from "react";
import {
  AlgolStaticGameAPI,
  AlgolGameGraphics,
  AlgolMeta,
  AlgolDemo,
} from "../../../../types";

import { Board } from "../Board";
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
  const [{ battle, frame, mode, session }, battleActions] = useBattle(api);
  const actions = useMemo(() => ({ ...pageActions, ...battleActions }), [
    pageActions,
    battleActions,
  ]);
  const ui = useUI(api, battle, frame, demo, mode);
  const frameCount = battle ? battle.history.length - 1 : 0;

  let crumbs: Crumb[];
  let body: ReactNode;
  if (mode === "history") {
    // We are currently watching the history of a battle
    crumbs = [
      { content: meta.name, onClick: actions.toGameLobby },
      { content: session!.id, onClick: actions.toBattleLobby },
      { content: battle!.gameEndedBy ? "finished" : "history" },
    ];
    body = (
      <BattleHistory
        actions={actions}
        content={ui.instruction}
        frame={Math.max(0, frame)}
        frameCount={frameCount}
        battleFinished={Boolean(battle!.gameEndedBy)}
      />
    );
  } else if (mode === "battlelobby") {
    crumbs = [
      { content: meta.name, onClick: actions.toGameLobby },
      { content: session!.id },
    ];
    body = (
      <BattleLanding
        actions={actions}
        session={session!}
        haveHistory={frameCount > 1}
      />
    );
  } else if (mode === "playing") {
    // We are actively playing an ongoing battle
    crumbs = [
      { content: meta.name, onClick: actions.toGameLobby },
      { content: session!.id, onClick: actions.toBattleLobby },
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
      <BattleControls
        actions={actions}
        undo={ui.undo}
        instruction={ui.instruction}
        haveHistory={frameCount > 1}
      />
    );
  } else {
    // No battle active, we're just at the game landing page
    crumbs = [{ content: meta.name }];
    body = (
      <GameLanding
        meta={meta}
        actions={actions}
        graphics={graphics}
        session={session}
      />
    );
  }

  return (
    <Fragment>
      <Board
        callback={actions.mark}
        graphics={graphics}
        units={ui.board.units}
        marks={ui.board.marks}
        potentialMarks={ui.board.potentialMarks}
        anim={ui.board.anim}
        active={mode === "playing"}
      />
      <Breadcrumbs crumbs={crumbs} actions={actions} />
      {body}
    </Fragment>
  );
};
