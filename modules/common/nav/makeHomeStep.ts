import { AlgolNavStep } from "../../types";
import { makeGameIndexStep } from "./makeGameIndexStep";
import { makeAboutIndexStep } from "./makeAboutIndexStep";
import { makeNewsIndexStep } from "./makeNewsIndexStep";

export const makeHomeStep = (): AlgolNavStep => ({
  id: "titlescreen",
  title: "Home",
  desc: "Title screen",
  url: "/",
  links: [makeGameIndexStep(), makeAboutIndexStep(), makeNewsIndexStep()],
});
