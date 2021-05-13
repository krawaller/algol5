import { useMemo, useState } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolSession,
} from "../../../../types";
import { localSessionActions } from "../../../../local/expose";

export type BattleHookState = {
  battle?: AlgolBattle | null;
  frame: number;
  session?: AlgolSession | null;
  loading?: string | null;
};

export const useBattleActionsAndState = (api: AlgolStaticGameAPI) => {
  const [state, setState] = useState<BattleHookState>({
    frame: -1,
  });
  const actions = useMemo(
    () => ({
      toFrame: (frame: number) =>
        setState(current => ({
          ...current,
          frame,
        })),
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
      loadSession: (sessionId: string) => {
        // TODO - act different if remote
        const { session, battle, error } = localSessionActions.loadSession({
          sessionId,
          api,
        });
        if (error) {
          alert(error);
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
      },
      endTurn: () => {
        // TODO - act different if remote
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
    [api]
  );
  return [state, actions] as const;
};

export type BattleActions = ReturnType<typeof useBattleActionsAndState>[1];
