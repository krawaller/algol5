import {
  AlgolGameBlobAnon,
  AlgolMeta,
  AlgolLocalBattle,
  BattleNavActions,
  BattleMode,
  AlgolNav,
} from "../../types";
import { makeSessionControlsLink } from "./makeSessionControlsLink";
import { makeSessionHistoryLink } from "./makeSessionHistoryLink";
import { makeSessionLobbyLink } from "./makeSessionLobbyLink";
import { makeGameNav } from "./makeGameNav";

type MakeSessionNavOpts = {
  meta: AlgolMeta<AlgolGameBlobAnon>;
  session: AlgolLocalBattle;
  battleNavActions: BattleNavActions;
  mode: BattleMode;
};

export const makeSessionNav = (opts: MakeSessionNavOpts): AlgolNav => {
  const { battleNavActions, session, meta, mode } = opts;
  const gameNav = makeGameNav(meta);
  const crumbs = gameNav.crumbs.concat(gameNav.me);
  const lobbyLink = makeSessionLobbyLink(opts);
  const historyLink = makeSessionHistoryLink(battleNavActions);
  const controlsLink = makeSessionControlsLink(battleNavActions);

  switch (mode) {
    case "battlelobby":
      return {
        key: `session-${session.id}-lobby`,
        crumbs,
        me: lobbyLink,
        links: [controlsLink, historyLink],
      };
    case "history":
      return {
        key: `session-${session.id}-history`,
        crumbs: crumbs.concat(lobbyLink),
        me: historyLink,
        links: [],
      };
    case "playing":
      return {
        key: `session-${session.id}-playing`,
        crumbs: crumbs.concat(lobbyLink),
        me: controlsLink,
        links: [],
      };
    case "gamelobby":
      return gameNav;
    default:
      throw new Error(`Cannot make session nav for unknown mode "${mode}"`);
  }
};
