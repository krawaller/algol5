import { useState, useMemo } from "react";

type Mode = "gamelobby" | "battlelobby" | "playing" | "history";

export const useMode = () => {
  const [mode, setMode] = useState<Mode>("gamelobby");
  const actions = useMemo(
    () => ({
      toHistory: () => setMode("history"),
      toGameLobby: () => setMode("gamelobby"),
      toBattleLobby: () => setMode("battlelobby"),
      toBattleControls: () => setMode("playing"),
    }),
    []
  );
  return [mode, actions] as const;
};

export type ModeActions = ReturnType<typeof useMode>[1];
