import { AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { tagIndexLink } from "./tagIndexLink";

export const tagIndexNav: AlgolNav = {
  key: "tagindexnav",
  links: [],
  crumbs: [homeLink],
  me: tagIndexLink,
};
