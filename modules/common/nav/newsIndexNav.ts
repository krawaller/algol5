import { AlgolNav } from "../../types";
import { makeHomeStep } from "./makeHomeStep";
import { makeNewsIndexStep } from "./makeNewsIndexStep";

export const newsIndexNav: AlgolNav = {
  key: "newsindexnav",
  crumbs: [makeHomeStep()],
  me: makeNewsIndexStep(),
};
