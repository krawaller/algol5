import { AlgolNav } from "./nav";

export interface AppActions {
  navTo: (path: string) => void;
  prefetch: (path: string) => void;
  setNav: (nav: AlgolNav) => void;
}

export const fakeAppActions: AppActions = {
  navTo: str => console.log("nav to", str),
  prefetch: str => console.log("prefetch", str),
  setNav: nav => console.log("nav updated", nav),
};
