import { useMemo, useReducer } from "react";

type Mode = "gamelobby" | "battlelobby" | "playing" | "history";

type Action =
  | Mode
  | ["load", string]
  | ["load", string, Mode | undefined]
  | ["new", string, Mode | undefined];
type State = [Mode, string | null];

const reducer = (state: State, action: Action): State => {
  const [mode, sessionId] = state;
  if (action === "battlelobby") return ["battlelobby", sessionId];
  if (action === "gamelobby") return ["gamelobby", sessionId];
  if (action === "history") return ["history", sessionId];
  if (action === "playing") return ["playing", sessionId];
  if (Array.isArray(action)) {
    if (action[0] === "load") return [action[2] || "battlelobby", action[1]];
    if (action[0] === "new")
      return [action[2] || "battlelobby", `new_${action[1]}`];
  }
  throw new Error(`Unknown action: ${JSON.stringify(action || {})}`);
};

export const useMode = () => {
  const [[mode, sessionId], dispatch] = useReducer(reducer, [
    "gamelobby",
    null,
  ]);
  const actions = useMemo(
    () => ({
      toHistory: () => dispatch("history"),
      toGameLobby: () => dispatch("gamelobby"),
      toBattleLobby: () => dispatch("battlelobby"),
      toBattleControls: () => dispatch("playing"),
      toSession: (sessionId: string, mode?: Mode) =>
        dispatch(["load", sessionId, mode]),
      newLocalBattle: (code: string, mode?: Mode) =>
        dispatch(["new", code, mode]),
    }),
    []
  );
  return [mode, sessionId, actions] as const;
};

export type ModeActions = ReturnType<typeof useMode>[2];
