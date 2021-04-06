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
import { useAppActions, useBattleNav } from "../../contexts";

type UseActionsOpts = {
  battleActions: BattleActions;
  setErrorReport: (err: AlgolErrorReport) => void;
  api: AlgolStaticGameAPI;
};

export const useActions = (opts: UseActionsOpts) => {
  const { battleActions, setErrorReport, api } = opts;
  const battleNavActions = useBattleNav();
  const appActions = useAppActions();
  const actions = useMemo(
    () => ({
      ...appActions,
      ...battleNavActions,
      ...battleActions,
      newLocalBattle: (code: string) => {
        battleNavActions.newLocalBattle(code);
      },
      deleteSession: (sessionId: string, retreatToGameLobby: boolean) => {
        deleteSession(api.gameId, sessionId);
        if (retreatToGameLobby) {
          battleNavActions.toGameLobby();
        }
      },
      loadLocalSession: (sessionId: string) => {
        battleNavActions.toSession(sessionId);
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
        battleNavActions.toSession(session.id);
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
        battleNavActions.toSession(session.id);
      },
      reportError: (
        error: AlgolError,
        level: AlgolErrorReportLevel = "warning"
      ) => setErrorReport({ error, level }),
    }),
    [battleNavActions, battleActions, setErrorReport, api]
  );
  return actions;
};
