import { useEffect, useRef } from "react";
import {
  AlgolBattleUI,
  AlgolGameBlobAnon,
  AlgolMeta,
  AlgolStaticGameAPI,
} from "../../../../types";
import {
  setLatestSessionInfo,
  setLatestVisitedGameId,
} from "../../../../local/expose";
import { BattleMode, useAppActions, useBattleNav } from "../../contexts";
import {
  BattleHookState,
  BattleActions,
} from "./GamePage.useBattleActionsAndState";
import { makeGameNav } from "../../../../common/nav/makeGameNav";
import { makeSessionNav } from "../../../../common/nav/makeSessionNav";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { board2sprites, sprites2arrangement } from "../../../../common";

type UseBattleEffectsOpts = {
  api: AlgolStaticGameAPI;
  sessionId?: string | null;
  state: BattleHookState;
  actions: BattleActions;
  mode: BattleMode;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  ui: AlgolBattleUI;
};

const SCREENSHOT = false; // TODO - setting somewhere!

export function useBattleEffects(opts: UseBattleEffectsOpts) {
  const { api, sessionId, state, actions, mode, meta, ui } = opts;
  const battleNavActions = useBattleNav();
  const appActions = useAppActions();
  const justStartedNew = useRef(false);

  // register api with remote service
  const remoteAPI = useRemoteAPI();
  useEffect(() => {
    remoteAPI.game.setGameAPI(api);
    return () => remoteAPI.game.setGameAPI(null);
  }, [api]);

  // update nav map whenever we change mode or sessionId
  useEffect(() => {
    appActions.setNav(
      mode === "gamelobby"
        ? makeGameNav(meta)
        : makeSessionNav({
            mode,
            session: state.session!,
            battleNavActions,
            meta,
            isNew: Boolean(sessionId && sessionId.match(/new/)),
          })
    );
  }, [mode, sessionId, appActions, battleNavActions]);

  // Register last visited game
  useEffect(() => setLatestVisitedGameId(api.gameId), [api.gameId]);

  // If sessionId changed, get correct session
  useEffect(() => {
    if (sessionId) {
      if (sessionId.match(/^new_/)) {
        const code = sessionId.slice(4);
        justStartedNew.current = true;
        actions.newLocalSession(code);
      } else {
        actions.loadSession(sessionId);
      }
    }
  }, [sessionId, api]);
  const currentSessionId = state.session && state.session.id;
  const hasMoves = ((state.battle && state.battle.history.length) || 0) >= 2;

  // If we're in a new session that now has proper history, navigate to it and remember it as last session
  useEffect(() => {
    if (
      !justStartedNew.current &&
      sessionId &&
      sessionId.match(/^new_/) &&
      currentSessionId &&
      hasMoves
    ) {
      setLatestSessionInfo(api.gameId, currentSessionId);
      battleNavActions.toSession(currentSessionId, "playing", true);
    }
  }, [sessionId, currentSessionId, hasMoves]);
  justStartedNew.current = false;

  // Print board state
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
}
