import { AlgolNav } from "../../types";
import { makeHomeStep } from "./makeHomeStep";

export const homeNav: AlgolNav = {
  key: "home",
  crumbs: [],
  me: makeHomeStep(),
};
