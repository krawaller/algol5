import { Router } from "next/router";
import { useMemo } from "react";
import { BattleNavActions, BattleMode } from "../../ui/src/contexts";

const gameRoot = (path: string) =>
  path
    .split("/")
    .slice(0, 3)
    .join("/");

export const useBattleNavActions = (router: Router) => {
  const actions: BattleNavActions = useMemo(
    () => ({
      toHistory: () =>
        router.push({
          pathname: gameRoot(router.pathname),
          query: { sid: router.query.sid, m: "history" },
        }),
      toGameLobby: () =>
        router.push({
          pathname: gameRoot(router.pathname),
        }),
      toBattleLobby: () =>
        router.push({
          pathname: gameRoot(router.pathname),
          query: { sid: router.query.sid, m: "battlelobby" },
        }),
      toBattleControls: () =>
        router.push({
          pathname: gameRoot(router.pathname),
          query: { sid: router.query.sid, m: "playing" },
        }),
      toSession: (sessionId: string, mode?: BattleMode, replace?: boolean) =>
        router[replace ? "replace" : "push"]({
          pathname: gameRoot(router.pathname),
          query: { sid: sessionId, m: mode || "battlelobby" },
        }),
      toNewLocalBattle: (code: string, mode?: BattleMode, slug?: string) =>
        router.push({
          pathname: slug ? `/games/${slug}/` : gameRoot(router.pathname),
          query: { sid: `new_${code}`, m: mode || "playing" },
        }),
    }),
    []
  );
  return actions;
};
