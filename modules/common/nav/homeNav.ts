import { AlgolNav } from "../../types";
import { homeStep } from "./homeStep";
import { gameIndexStep } from "./gameIndexStep";
import { aboutIndexStep } from "./aboutIndexStep";
import { newsIndexStep } from "./newsIndexStep";

export const homeNav: AlgolNav = {
  key: "home",
  crumbs: [],
  me: homeStep,
  links: [gameIndexStep, aboutIndexStep, newsIndexStep],
};
