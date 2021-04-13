import { createContext, useContext } from "react";
import { AlgolNav } from "../../../types/page/nav";
import { AlgolEvent } from "../../../types/page/events";
import { AlgolErrorReporter } from "../../../types/error";

export type AppActions = {
  navTo: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  prefetch: (path: string) => void;
  setNav: (nav: AlgolNav) => void;
  logEvent: (evt: AlgolEvent) => void;
  setFullscreenNav: (bool: boolean) => void;
  reportError: AlgolErrorReporter;
};

export const fakeAppActions: AppActions = {
  navTo: str => console.log("nav to", str),
  replace: str => console.log("replace path", str),
  prefetch: str => console.log("prefetch", str),
  back: () => console.log("back"),
  setNav: nav => console.log("nav updated", nav),
  logEvent: evt => console.log("logged event", evt),
  setFullscreenNav: bool => console.log("fullscreen nav set to", bool),
  reportError: (err, lvl) => console.log("logged error", err, "level", lvl),
};

export const AppActionContext = createContext(fakeAppActions);

export const useAppActions = () => {
  return useContext(AppActionContext);
};
