import { AlgolNav } from "./nav";
import { AlgolEvent } from "./events";

export interface AppActions {
  navTo: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  prefetch: (path: string) => void;
  setNav: (nav: AlgolNav) => void;
  logEvent: (evt: AlgolEvent) => void;
}

export const fakeAppActions: AppActions = {
  navTo: str => console.log("nav to", str),
  replace: str => console.log("replace path", str),
  prefetch: str => console.log("prefetch", str),
  back: () => console.log("back"),
  setNav: nav => console.log("nav updated", nav),
  logEvent: evt => console.log("logged event", evt),
};
