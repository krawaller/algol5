import { AlgolNavStep } from "../../types";
import { gameIndexStep } from "./gameIndexStep";
import { aboutIndexStep } from "./aboutIndexStep";
import { newsIndexStep } from "./newsIndexStep";

export const homeStep: AlgolNavStep = {
  id: "titlescreen",
  title: "Home",
  desc: "Title screen",
  url: "/",
  links: [gameIndexStep, aboutIndexStep, newsIndexStep],
};
