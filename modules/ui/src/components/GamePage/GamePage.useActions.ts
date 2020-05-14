import { useMemo } from "react";
import { BattleActions } from "./GamePage.useBattle";
import { ModeActions } from "./GamePage.useMode";
import {
  AlgolErrorReport,
  AlgolError,
  AlgolErrorReportLevel,
} from "../../../../types";
import { PageActions } from "../../helpers";

type UseActionsOpts = {
  battleActions: BattleActions;
  modeActions: ModeActions;
  pageActions: PageActions;
  setErrorReport: (err: AlgolErrorReport) => void;
};

export const useActions = (opts: UseActionsOpts) => {
  const { battleActions, modeActions, pageActions, setErrorReport } = opts;
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
      forkSession: () => {
        battleActions.forkSession();
        modeActions.toBattleLobby();
      },
      importSession: (str: string) => {
        battleActions.importSession(str);
        modeActions.toBattleLobby();
      },
      reportError: (
        error: AlgolError,
        level: AlgolErrorReportLevel = "warning"
      ) => setErrorReport({ error, level }),
    }),
    [pageActions, battleActions, modeActions, setErrorReport]
  );
  return actions;
};
