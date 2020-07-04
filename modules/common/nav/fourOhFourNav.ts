import { AlgolNav } from "../../types";
import { makeHomeStep } from "./makeHomeStep";

export const fourOhFourNav: AlgolNav = {
  key: "fourohfour",
  crumbs: [makeHomeStep()],
  me: {
    id: "four-oh-four",
    desc: "Lost in the woods!",
    links: [],
    title: "404",
  },
};
