import { AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { gameIndexLink } from "./gameIndexLink";

export const gameIndexNav: AlgolNav = {
  key: "gameindexnav",
  links: [],
  crumbs: [homeLink],
  me: gameIndexLink,
};
