import { useMemo, useReducer, useEffect } from "react";
import {
  BattleNavActions,
  BattleMode,
} from "../../ui/src/helpers/battleActions";

type Action =
  | "reset"
  | BattleMode
  | ["load", string]
  | ["load", string, BattleMode | undefined]
  | ["new", string, BattleMode | undefined];
type State = [BattleMode, string | null];

const reducer = (state: State, action: Action): State => {
  const [mode, sessionId] = state;
  if (action === "battlelobby") return ["battlelobby", sessionId];
  if (action === "gamelobby") return ["gamelobby", sessionId];
  if (action === "history") return ["history", sessionId];
  if (action === "playing") return ["playing", sessionId];
  if (action === "reset") return ["gamelobby", null];
  if (Array.isArray(action)) {
    if (action[0] === "load") return [action[2] || "battlelobby", action[1]];
    if (action[0] === "new")
      return [action[2] || "battlelobby", `new_${action[1]}`];
  }
  throw new Error(`Unknown action: ${JSON.stringify(action || {})}`);
};

export const useBattleNavActions = (domain?: string) => {
  const [[mode, sessionId], dispatch] = useReducer(reducer, [
    "gamelobby",
    null,
  ]);
  useEffect(() => dispatch("reset"), [domain]);
  const actions: BattleNavActions = useMemo(
    () => ({
      toHistory: () => dispatch("history"),
      toGameLobby: () => dispatch("gamelobby"),
      toBattleLobby: () => dispatch("battlelobby"),
      toBattleControls: () => dispatch("playing"),
      toSession: (sessionId: string, mode?: BattleMode) =>
        dispatch(["load", sessionId, mode]),
      newLocalBattle: (code: string, mode?: BattleMode) =>
        dispatch(["new", code, mode]),
    }),
    []
  );
  return [mode, sessionId, actions] as const;
};
