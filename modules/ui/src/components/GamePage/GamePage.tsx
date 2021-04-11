/*
 * Used in the Next app as a "homepage" for the individual games.
 */

import React, { ReactNode, useEffect } from "react";

import { Board } from "../Board";
import { Page } from "../Page";
import { BattleLanding } from "../BattleLanding";
import { GameLanding } from "../GameLanding";
import { BattleHistory } from "../BattleHistory";
import { useUI } from "./GamePage.useUI";
import { useBattle } from "./GamePage.useBattle";
import { useActions } from "./GamePage.useActions";
import { BattleMove } from "../BattleMove";
import {
  getLatestSessionIdForGame,
  setLatestVisitedGameId,
} from "../../../../local/src";
import { makeSessionNav } from "../../../../common/nav/makeSessionNav";
import { makeGameNav } from "../../../../common/nav/makeGameNav";
import { board2sprites, sprites2arrangement } from "../../../../common";
import { useRemoteAPI } from "../../../../remote/utils/context";
import {
  useAppActions,
  useAppState,
  useBattleNav,
  useGamePayload,
} from "../../contexts";

const SCREENSHOT = false; // TODO - setting somewhere!

export const GamePage = () => {
  const battleNavActions = useBattleNav();
  const gamePayload = useGamePayload();
  const { battleMode: givenMode = "gamelobby", sessionId } = useAppState();
  const appActions = useAppActions();
  const { api, graphics, meta, demo, rules } = gamePayload;
  const [
    { battle, frame, session, corruptSessions },
    battleActions,
  ] = useBattle(api, sessionId as string, battleNavActions.toSession);
  const actions = useActions({
    battleActions,
    api,
  });
  const ui = useUI(api, battle, frame, demo, givenMode);
  const mode = battle ? givenMode : "gamelobby";

  useEffect(() => setLatestVisitedGameId(api.gameId), [api.gameId]);

  const remoteAPI = useRemoteAPI();
  useEffect(() => {
    remoteAPI.game.setGameAPI(api);
    return () => remoteAPI.game.setGameAPI(null);
  }, [api]);

  useEffect(() => {
    appActions.setNav(
      mode === "gamelobby"
        ? makeGameNav(gamePayload.meta)
        : makeSessionNav({
            mode,
            session: session!,
            battleNavActions,
            meta: gamePayload.meta,
            isNew: Boolean(sessionId && sessionId.match(/new/)),
          })
    );
  }, [mode, sessionId, appActions, battleNavActions]);

  // TODO - maybe not read this on every render? move to state somewhere?
  const previousSessionId = getLatestSessionIdForGame(api.gameId);

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
        manyVariants={api.variants.length > 1}
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
        corruptSessions={corruptSessions}
      />
    );
  }

  // const name = gamePayload.meta.name;
  // const title =
  //   mode === "playing"
  //     ? "Making a move"
  //     : mode === "history"
  //     ? "Battle history"
  //     : mode === "battlelobby"
  //     ? battle!.history!.length
  //       ? "New battle"
  //       : battle!.gameEndedBy
  //       ? "Finished battle"
  //       : "Ongoing battle"
  //     : name;

  if (SCREENSHOT && mode === "playing") {
    console.log(
      "SCREENSHOT",
      sprites2arrangement({
        iconMap: api.iconMap,
        sprites: board2sprites({
          iconMap: api.iconMap,
          marks: ui.board.marks,
          units: ui.board.units,
          potentialMarks: ui.board.potentialMarks,
        }),
      })
    );
  }

  return (
    <Page
      title={gamePayload.meta.name}
      top={
        <Board
          callback={actions.mark}
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
