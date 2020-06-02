import { AlgolNav } from "../../types";
import { homeStep } from "./homeStep";
import { gameIndexStep } from "./gameIndexStep";
import { tagIndexStep } from "./tagIndexStep";

export const gameIndexNav: AlgolNav = {
  key: "gameindexnav",
  links: [tagIndexStep],
  crumbs: [homeStep],
  me: gameIndexStep,
};
