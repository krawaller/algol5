import { AlgolNavStep } from "../../types";
import { tagIndexStep } from "./tagIndexStep";
import { gameCount } from "../utils";

export const gameIndexStep: AlgolNavStep = {
  id: "gameindex",
  title: "Games",
  desc: `List of all ${gameCount()} games`,
  url: "/games",
  links: [tagIndexStep],
};
