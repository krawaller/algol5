import { createContext, useContext } from "react";
import { homeNav } from "../../../common/nav/homeNav";
import { AlgolNav } from "../../../types";

export type AppState = {
  nav?: AlgolNav;
  isFullscreenNav: boolean;
  neverFullscreenNav: boolean;
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
