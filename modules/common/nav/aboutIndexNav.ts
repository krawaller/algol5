import { AlgolNav } from "../../types";
import { homeStep } from "./homeStep";
import { aboutIndexStep } from "./aboutIndexStep";

export const aboutIndexNav: AlgolNav = {
  key: "aboutindexnav",
  links: [],
  me: aboutIndexStep,
  crumbs: [homeStep],
};
