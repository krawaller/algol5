import { AlgolNavStep } from "../../types";

export const makeNewsIndexStep = (): AlgolNavStep => ({
  id: "newsindex",
  title: "News",
  desc: "News about Chessicals",
  url: "/news",
  links: [],
});
