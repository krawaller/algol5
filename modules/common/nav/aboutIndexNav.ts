import { AlgolNav } from "../../types";
import { makeHomeStep } from "./makeHomeStep";
import { makeAboutIndexStep } from "./makeAboutIndexStep";

export const aboutIndexNav: AlgolNav = {
  key: "aboutindexnav",
  me: makeAboutIndexStep(),
  crumbs: [makeHomeStep()],
};
