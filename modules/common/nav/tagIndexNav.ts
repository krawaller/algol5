import { AlgolNav } from "../../ui/src/helpers";
import { homeLink } from "./homeLink";
import { tagIndexLink } from "./tagIndexLink";

export const tagIndexNav: AlgolNav = {
  key: "tagindexnav",
  links: [],
  crumbs: [homeLink, tagIndexLink],
};
