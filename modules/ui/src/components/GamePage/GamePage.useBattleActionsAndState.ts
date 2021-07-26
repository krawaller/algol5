import { useMemo, useState } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolSession,
} from "../../../../types";
import { localSessionActions } from "../../../../local/expose";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { sessionIdType } from "../../../../common";
import { useIsMounted } from "../../helpers";
import { useAppState } from "../../contexts";

export type BattleHookState = {
  battle?: AlgolBattle | null;
  frame: number;
  session?: AlgolSession | null;
  loading?: "session" | "endTurn" | null;
};

export const useBattleActionsAndState = (api: AlgolStaticGameAPI) => {
  const remote = useRemoteAPI();
  const isMounted = useIsMounted();
  const { sessionId } = useAppState();
  const [state, setState] = useState<BattleHookState>({
    frame: -1,
  });
  const actions = useMemo(
    () => ({
      wipe: () => {
        setState({ frame: -1 });
      },
      toFrame: (frame: number) =>
        setState(current => ({
          ...current,
          frame,
        })),
      subscriptionUpdate: (session: AlgolSession, battle: AlgolBattle) => {
        setState({
          battle,
          session,
          frame: battle.history.length - 1,
          loading: null,
        });
      },
      newLocalSession: (code: string) => {
        const { battle, session } = localSessionActions.newSession({
          api,
          code,
        });
        setState({
          battle,
          frame: 0,
          session,
        });
      },
      loadSession: async (sessionId: string) => {
        if (sessionIdType(sessionId) === "remote") {
          // Handle loading remote session
          setState({
            frame: -1,
            loading: "session",
          });
          const { battle, session } = await remote.battle.load(sessionId);
          if (isMounted()) {
            setState({
              frame: battle.history.length - 1,
              session,
              battle,
            });
          }
        } else {
          // Handle loading local session
          const { session, battle, error } = localSessionActions.loadSession({
            sessionId,
            api,
          });
          if (error) {
            alert(error); // TODO - proper error toaster
            setState({
              frame: -1,
            });
          }
          const frame = battle ? battle.history.length - 1 : -1;
          setState({
            battle,
            session,
            frame,
          });
        }
      },
      endTurn: async () => {
        if (sessionIdType(sessionId) === "remote") {
          // Ending turn in remote battle
          let _session: AlgolSession;
          let _battle: AlgolBattle;
          setState(current => {
            _session = current.session!;
            _battle = current.battle!;
            return {
              ...current,
              loading: "endTurn",
            };
          });
          try {
            const { session, battle } = await remote.battle.endTurn({
              session: _session!,
              battle: _battle!,
            });
            if (isMounted()) {
              setState({
                session,
                battle,
                frame: battle.history.length - 1,
                loading: null,
              });
            }
          } catch (err) {
            alert(err); // TODO - proper error toaster
            setState(current => ({
              ...current,
              loading: null,
            }));
          }
        } else {
          // Ending turn in local battle
          setState(current => {
            const battle = api.performAction(current.battle!, "endTurn");
            const session = localSessionActions.updateSessionFromBattle({
              battle,
              session: current.session!,
              api,
            });
            return {
              frame: battle.history.length - 1,
              battle,
              session,
            };
          });
        }
      },
      mark: (pos: string) => {
        setState(current => ({
          ...current,
          battle: api.performAction(current.battle!, "mark", pos),
        }));
      },
      command: (cmnd: string) => {
        setState(current => ({
          ...current,
          battle: api.performAction(current.battle!, "command", cmnd),
        }));
      },
      undoBattleCommand: () => {
        setState(current => ({
          ...current,
          battle: api.performAction(current.battle!, "undo"),
        }));
      },
    }),
    [api, sessionId]
  );
  return [state, actions] as const;
};

export type BattleActions = ReturnType<typeof useBattleActionsAndState>[1];
