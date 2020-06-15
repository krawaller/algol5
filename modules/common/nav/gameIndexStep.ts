import { AlgolNavStep } from "../../types";
import { list } from "../../games/dist/list";
import { tagIndexStep } from "./tagIndexStep";

export const gameIndexStep: AlgolNavStep = {
  title: "Games",
  desc: `List of all ${list.length} games`,
  url: "/games",
  links: [tagIndexStep],
};
