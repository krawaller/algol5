import { AlgolNav } from "../../types";
import { homeStep } from "./homeStep";
import { gameIndexStep } from "./gameIndexStep";

export const gameIndexNav: AlgolNav = {
  key: "gameindexnav",
  crumbs: [homeStep],
  me: gameIndexStep,
};
