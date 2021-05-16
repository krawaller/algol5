import { useMemo } from "react";
import { AlgolBattle, AlgolStaticGameAPI } from "../../types";
import { localSessionActions } from "../../local/expose";
import { useRouter } from "./router";
import { useBattleNavActions } from "./useBattleNavActions";

export const useLocalBattleActions = (api: AlgolStaticGameAPI) => {
  const router = useRouter();
  const battleNavActions = useBattleNavActions(router);
  const actions = useMemo(
    () => ({
      newLocalBattle: battleNavActions.toNewLocalBattle,
      deleteSession: (sessionId: string, retreatToGameLobby: boolean) => {
        localSessionActions.deleteSession(sessionId, api.gameId);
        if (retreatToGameLobby) {
          battleNavActions.toGameLobby();
        }
      },
      loadLocalSession: (sessionId: string) => {
        battleNavActions.toSession(sessionId);
      },
      forkBattleFrame: (battle: AlgolBattle, frame: number) => {
        const { session } = localSessionActions.forkBattleFrame({
          battle,
          frame,
          api,
        });
        battleNavActions.toSession(session.id);
      },
      importSession: (seed: string) => {
        const { session } = localSessionActions.importSession({ seed, api });
        battleNavActions.toSession(session.id);
      },
    }),
    [battleNavActions, api]
  );
  return actions;
};
