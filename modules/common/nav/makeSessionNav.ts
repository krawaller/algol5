import {
  AlgolGameBlobAnon,
  AlgolMeta,
  AlgolLocalBattle,
  BattleNavActions,
  BattleMode,
  AlgolNav,
} from "../../types";
import { makeSessionControlsStep } from "./makeSessionControlsStep";
import { makeSessionHistoryStep } from "./makeSessionHistoryStep";
import { makeSessionLobbyStep } from "./makeSessionLobbyStep";
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
  gameNav.me.onClick = battleNavActions.toGameLobby;
  delete gameNav.me.url;
  const crumbs = gameNav.crumbs.concat(gameNav.me);
  const lobbyStep = makeSessionLobbyStep(opts);
  const historyStep = makeSessionHistoryStep(battleNavActions);
  const controlsStep = makeSessionControlsStep(battleNavActions);

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
        key: `session-${session.id}-playing`,
        crumbs: crumbs.concat(lobbyStep),
        me: controlsStep,
      };
    case "gamelobby":
      return gameNav;
    default:
      throw new Error(`Cannot make session nav for unknown mode "${mode}"`);
  }
};
