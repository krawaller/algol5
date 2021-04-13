import { useMemo } from "react";
import { AlgolBattle, AlgolStaticGameAPI } from "../../types";
import { BattleMode } from "../../ui/src/contexts";
import { parseSeed } from "../../encoding/src/seed";
import {
  importSessionFromBattle,
  writeSession,
  forkSessionFromBattle,
  deleteSession,
} from "../../local/src";
import { useRouter } from "./router";
import { useBattleNavActions } from "./useBattleNavActions";

const gameRoot = (path: string) =>
  path
    .split("/")
    .slice(0, 3)
    .join("/");

export const useLocalBattleActions = (api: AlgolStaticGameAPI) => {
  const router = useRouter();
  const battleNavActions = useBattleNavActions(router);
  const actions = useMemo(
    () => ({
      newLocalBattle: (code: string, mode?: BattleMode) =>
        router.push({
          pathname: gameRoot(router.pathname),
          query: { sid: `new_${code}`, m: mode || "playing" },
        }),
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
    }),
    [battleNavActions, api]
  );
  return actions;
};
