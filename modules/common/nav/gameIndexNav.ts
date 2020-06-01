import { AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { gameIndexLink } from "./gameIndexLink";
import { tagIndexLink } from "./tagIndexLink";

export const gameIndexNav: AlgolNav = {
  key: "gameindexnav",
  links: [tagIndexLink],
  crumbs: [homeLink],
  me: gameIndexLink,
};
