import { AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { gameIndexLink } from "./gameIndexLink";
import { tagIndexLink } from "./tagIndexLink";
import { aboutIndexLink } from "./aboutIndexLink";
import { newsIndexLink } from "./newsIndexLink";

export const homeNav: AlgolNav = {
  key: "home",
  crumbs: [],
  me: homeLink,
  links: [gameIndexLink, tagIndexLink, aboutIndexLink, newsIndexLink],
};
