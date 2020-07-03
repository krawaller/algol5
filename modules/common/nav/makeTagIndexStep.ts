import { AlgolNavStep } from "../../types";

export const makeTagIndexStep = (): AlgolNavStep => ({
  id: "tagindex",
  title: "Tags",
  desc: "To sort the games by",
  url: "/tags",
  links: [],
});
