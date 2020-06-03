import { AlgolNav } from "../../types";
import { homeStep } from "./homeStep";
import { aboutIndexStep } from "./aboutIndexStep";

export const aboutIndexNav: AlgolNav = {
  key: "aboutindexnav",
  me: aboutIndexStep,
  crumbs: [homeStep],
};
