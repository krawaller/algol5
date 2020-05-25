import { AlgolNav } from "../../ui/src/helpers";
import { homeLink } from "./homeLink";
import { aboutIndexLink } from "./aboutIndexLink";

export const aboutIndexNav: AlgolNav = {
  key: "aboutindexnav",
  links: [],
  crumbs: [homeLink, aboutIndexLink],
};
