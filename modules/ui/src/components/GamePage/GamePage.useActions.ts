import { useMemo } from "react";
import { BattleActions } from "./GamePage.useBattle";
import { ModeActions } from "./GamePage.useMode";
import {
  AlgolErrorReport,
  AlgolError,
  AlgolErrorReportLevel,
  AlgolStaticGameAPI,
  AlgolBattle,
} from "../../../../types";
import { PageActions } from "../../helpers";
import { parseSeed } from "../../../../encoding/src/seed";
import {
  importSessionFromBattle,
  writeSession,
  forkSessionFromBattle,
} from "../../../../local/src";

type UseActionsOpts = {
  battleActions: BattleActions;
  modeActions: ModeActions;
  pageActions: PageActions;
  setErrorReport: (err: AlgolErrorReport) => void;
  api: AlgolStaticGameAPI;
};

export const useActions = (opts: UseActionsOpts) => {
  const { battleActions, modeActions, pageActions, setErrorReport, api } = opts;
  const actions = useMemo(
    () => ({
      ...pageActions,
      ...battleActions,
      ...modeActions,
      newLocalBattle: (code: string) => {
        battleActions.newLocalBattle(code);
        modeActions.toBattleControls();
      },
      deleteCurrentSession: () => {
        battleActions.deleteCurrentSession();
        modeActions.toGameLobby();
      },
      loadLocalSession: (sessionId: string) => {
        battleActions.loadLocalSession(sessionId);
        modeActions.toBattleLobby();
      },
      forkBattleFrame: (battle: AlgolBattle, frame: number) => {
        const historyFrame = battle.history[frame];
        const newBattle = api.fromFrame(historyFrame, battle.variant.code);
        const session = forkSessionFromBattle(newBattle, api.iconMap);
        writeSession(api.gameId, session);
        battleActions.loadLocalSession(session.id);
        modeActions.toBattleLobby();
      },
      importSession: (str: string) => {
        const save = parseSeed(str, api.gameId);
        const battle = api.fromSave(save);
        const session = importSessionFromBattle(battle, api.iconMap);
        writeSession(api.gameId, session);
        battleActions.loadLocalSession(session.id);
        modeActions.toBattleLobby();
      },
      reportError: (
        error: AlgolError,
        level: AlgolErrorReportLevel = "warning"
      ) => setErrorReport({ error, level }),
    }),
    [pageActions, battleActions, modeActions, setErrorReport, api]
  );
  return actions;
};
