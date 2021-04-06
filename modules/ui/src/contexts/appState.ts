import { createContext, useContext } from "react";
import { homeNav } from "../../../common/nav/homeNav";
import { AlgolNav } from "../../../types";

export type BattleMode = "gamelobby" | "battlelobby" | "playing" | "history";

export type AppState = {
  nav?: AlgolNav;
  isFullscreenNav: boolean;
  neverFullscreenNav: boolean;
  sessionId?: string;
  battleMode?: BattleMode;
};

export const fakeAppState: AppState = {
  nav: homeNav,
  isFullscreenNav: false,
  neverFullscreenNav: true,
};

export const AppStateContext = createContext(fakeAppState);

export const useAppState = () => {
  return useContext(AppStateContext);
};
