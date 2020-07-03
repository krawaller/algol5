import { AlgolNav } from "../../types";
import { gameIndexNav } from "./gameIndexNav";
import { makeTagIndexStep } from "./makeTagIndexStep";

export const tagIndexNav: AlgolNav = {
  key: "tagindexnav",
  crumbs: gameIndexNav.crumbs.concat(gameIndexNav.me),
  me: makeTagIndexStep(),
};
