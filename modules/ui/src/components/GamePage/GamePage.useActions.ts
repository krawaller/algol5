import { useMemo } from "react";
import { BattleActions } from "./GamePage.useBattle";
import {
  AlgolErrorReport,
  AlgolError,
  AlgolErrorReportLevel,
  AlgolStaticGameAPI,
  AlgolBattle,
} from "../../../../types";
import { parseSeed } from "../../../../encoding/src/seed";
import {
  importSessionFromBattle,
  writeSession,
  forkSessionFromBattle,
  deleteSession,
} from "../../../../local/src";
import { AppActions, BattleNavActions } from "../../contexts";

type UseActionsOpts = {
  battleActions: BattleActions;
  pageActions: AppActions & BattleNavActions;
  setErrorReport: (err: AlgolErrorReport) => void;
  api: AlgolStaticGameAPI;
};

export const useActions = (opts: UseActionsOpts) => {
  const { battleActions, pageActions, setErrorReport, api } = opts;
  const actions = useMemo(
    () => ({
      ...pageActions,
      ...battleActions,
      newLocalBattle: (code: string) => {
        pageActions.newLocalBattle(code);
      },
      deleteSession: (sessionId: string, retreatToGameLobby: boolean) => {
        deleteSession(api.gameId, sessionId);
        if (retreatToGameLobby) {
          pageActions.toGameLobby();
        }
      },
      loadLocalSession: (sessionId: string) => {
        pageActions.toSession(sessionId);
      },
      forkBattleFrame: (battle: AlgolBattle, frame: number) => {
        const historyFrame = battle.history[frame];
        const newBattle = api.fromFrame(historyFrame, battle.variant.code);
        const session = forkSessionFromBattle(
          newBattle,
          api.iconMap,
          api.gameId
        );
        writeSession(api.gameId, session);
        pageActions.toSession(session.id);
      },
      importSession: (str: string) => {
        const save = parseSeed(str, api.gameId);
        const battle = api.fromSave(save);
        const session = importSessionFromBattle(
          battle,
          api.iconMap,
          api.gameId
        );
        writeSession(api.gameId, session);
        pageActions.toSession(session.id);
      },
      reportError: (
        error: AlgolError,
        level: AlgolErrorReportLevel = "warning"
      ) => setErrorReport({ error, level }),
    }),
    [pageActions, battleActions, setErrorReport, api]
  );
  return actions;
};
