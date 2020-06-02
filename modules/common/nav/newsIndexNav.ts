import { AlgolNav } from "../../types";
import { homeStep } from "./homeStep";
import { newsIndexStep } from "./newsIndexStep";

export const newsIndexNav: AlgolNav = {
  key: "newsindexnav",
  links: [],
  crumbs: [homeStep],
  me: newsIndexStep,
};
