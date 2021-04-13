import {
  AlgolGameBlobAnon,
  AlgolMeta,
  AlgolSession,
  AlgolNav,
} from "../../types";
import { makeSessionControlsStep } from "./makeSessionControlsStep";
import { makeSessionHistoryStep } from "./makeSessionHistoryStep";
import { makeSessionLobbyStep } from "./makeSessionLobbyStep";
import { makeGameNav } from "./makeGameNav";
import { BattleMode, BattleNavActions } from "../../ui/src/contexts";

type MakeSessionNavOpts = {
  meta: AlgolMeta<AlgolGameBlobAnon>;
  session: AlgolSession;
  battleNavActions: BattleNavActions;
  mode: BattleMode;
  isNew?: boolean;
};

export const makeSessionNav = (opts: MakeSessionNavOpts): AlgolNav => {
  const { battleNavActions, session, meta, mode, isNew } = opts;
  const gameNav = makeGameNav(meta);
  gameNav.me.onClick = battleNavActions.toGameLobby;
  delete gameNav.me.url;
  const crumbs = gameNav.crumbs.concat(gameNav.me);
  const lobbyStep = makeSessionLobbyStep({
    session,
    gameId: meta.id,
    battleNavActions,
  });
  const historyStep = makeSessionHistoryStep({
    gameId: meta.id,
    battleNavActions,
    sessionId: session.id,
  });
  const controlsStep = makeSessionControlsStep({
    battleNavActions,
    isNew,
    gameId: meta.id,
    sessionId: session.id,
  });

  switch (mode) {
    case "battlelobby":
      return {
        key: `session-${session.id}-lobby`,
        crumbs,
        me: lobbyStep,
      };
    case "history":
      return {
        key: `session-${session.id}-history`,
        crumbs: crumbs.concat(lobbyStep),
        me: historyStep,
      };
    case "playing":
      return {
        key: isNew ? `session-new` : `session-${session.id}-playing`,
        crumbs: isNew ? crumbs : crumbs.concat(lobbyStep),
        me: controlsStep,
      };
    case "gamelobby":
      return gameNav;
    default:
      throw new Error(`Cannot make session nav for unknown mode "${mode}"`);
  }
};
