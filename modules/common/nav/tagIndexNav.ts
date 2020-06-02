import { AlgolNav } from "../../types";
import { gameIndexNav } from "./gameIndexNav";
import { tagIndexStep } from "./tagIndexStep";

export const tagIndexNav: AlgolNav = {
  key: "tagindexnav",
  links: [],
  crumbs: gameIndexNav.crumbs.concat(gameIndexNav.me),
  me: tagIndexStep,
};
