import { AlgolNavStep } from "../../types";
import { makeTagIndexStep } from "./makeTagIndexStep";
import { gameCount } from "../utils";

export const makeGameIndexStep = (): AlgolNavStep => ({
  id: "gameindex",
  title: "Games",
  desc: `List of all ${gameCount()} games`,
  url: "/games",
  links: [makeTagIndexStep()],
});
