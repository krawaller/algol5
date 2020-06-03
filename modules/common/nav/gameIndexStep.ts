import { AlgolNavStep } from "../../types";
import { tagIndexStep } from "./tagIndexStep";

export const gameIndexStep: AlgolNavStep = {
  title: "Games",
  desc: "Master list of all games",
  url: "/games",
  links: [tagIndexStep],
};
