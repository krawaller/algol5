import { AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { newsIndexLink } from "./newsIndexLink";

export const newsIndexNav: AlgolNav = {
  key: "newsindexnav",
  links: [],
  crumbs: [homeLink],
  me: newsIndexLink,
};
