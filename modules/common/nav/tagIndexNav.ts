import { AlgolNav } from "../../types";
import { gameIndexNav } from "./gameIndexNav";
import { tagIndexLink } from "./tagIndexLink";

export const tagIndexNav: AlgolNav = {
  key: "tagindexnav",
  links: [],
  crumbs: gameIndexNav.crumbs.concat(gameIndexNav.me),
  me: tagIndexLink,
};
