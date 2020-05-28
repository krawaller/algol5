import { AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { aboutIndexLink } from "./aboutIndexLink";

export const aboutIndexNav: AlgolNav = {
  key: "aboutindexnav",
  links: [],
  me: aboutIndexLink,
  crumbs: [homeLink],
};
