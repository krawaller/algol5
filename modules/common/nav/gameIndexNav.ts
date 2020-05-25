import { AlgolNav } from "../../ui/src/helpers";
import { homeLink } from "./homeLink";
import { gameIndexLink } from "./gameIndexLink";

export const gameIndexNav: AlgolNav = {
  key: "gameindexnav",
  links: [],
  crumbs: [homeLink, gameIndexLink],
};
