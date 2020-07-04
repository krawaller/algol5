import { AlgolNav } from "../../types";
import { makeHomeStep } from "./makeHomeStep";
import { makeGameIndexStep } from "./makeGameIndexStep";

export const gameIndexNav: AlgolNav = {
  key: "gameindexnav",
  crumbs: [makeHomeStep()],
  me: makeGameIndexStep(),
};
